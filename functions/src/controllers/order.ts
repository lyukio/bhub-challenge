import { Request, Response } from "express"
import { Order } from "../models/order"
import { CorrelationAction } from "../models/correlationAction"
import { Action } from "../models/action"

export class OrderController {
    async route_postJSON(req: Request, res: Response) {
        try {
            const order = new Order(req.body)
            if (!await order.create()) return res.status(422).json({ "response": "error on creating order" })
            const actions: Array<Action> = await this.getActions(order)
            await this.triggerActions(actions)
            order.fields.id = order.id
            return res.json({
                "order": order.fields,
            })
        } catch (error) {
            return res.json({
                error,
            })
        }
    }

    async getActions(order: Order) {
        const actions: Array<Action> = []
        const products = await order.products()
        const categories = await order.categories()
        if (products.length === 0 && categories.length === 0) return actions
        const correlationActions: CorrelationAction[] = await new CorrelationAction().loadByProducts(products)
        const categoriesCorrelationActions: CorrelationAction[] = await new CorrelationAction().loadByCategories(categories)
        correlationActions.push(...categoriesCorrelationActions)
        for (const correlationAction of correlationActions) {
            const instanceCorrelationAction = await new CorrelationAction().load(correlationAction.id)
            if (!instanceCorrelationAction) continue
            const action = await instanceCorrelationAction.action()
            if (action) actions.push(action)
        }
        return actions
    }

    async triggerActions(actions: Array<Action>) {
        for (const action of actions) {
            await action.trigger()
        }
    }

    async route_getJSON(req: Request, res: Response) {
        const orderId = req.params.id
        if (!orderId) return res.status(400).json({ "response": "orderId is necessary" })
        const order = new Order()
        if (!await order.load(orderId)) return res.status(400).json({ "response": "order not found", orderId })
        order.fields.id = order.id
        return res.json({
            "order": order.fields,
        })
    }

    // async route_getOtherExampleExamplesJSON(req: Request, res: Response) {
    //     const otherExampleId = res.get("otherExampleId") || req.query.otherExampleId
    //     if (!otherExampleId) return res.status(400).json({ "response": "otherExampleId is necessary" })
    //     const examples: any = await new User().loadByProperty("otherExampleId", otherExampleId)
    //     if (!examples) return res.status(422).json({ "response": "error on get examples by otherExampleId" })
    //     return res.json({
    //         examples,
    //     })
    // }
}

export const instance = new OrderController()
