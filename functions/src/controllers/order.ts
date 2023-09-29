import { Request, Response } from "express"
import { Order } from "../models/order"
import { CorrelationAction } from "../models/correlationAction"
import { Action } from "../models/action"

export class OrderController {
    async route_postJSON(req: Request, res: Response) {
        try {
            const itemIds = req.body.itemIds
            const userId = req.body.userId
            if (!userId || !Array.isArray(itemIds) || itemIds.length === 0) {
                return res.status(400).json({ "response": "userId and itemIds must be provided" })
            }
            const { status = "" } = req.body
            const order = new Order(status, itemIds, userId)
            if (!await order.create()) return res.status(422).json({ "response": "error on creating order" })
            const actions: Array<Action> = await this.getActions(order)
            const triggeredActions = await this.triggerActions(actions)
            order.fields.id = order.id
            return res.json({
                "order": order.fields,
                triggeredActions,
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
        const triggeredActions = []
        for (const action of actions) {
            triggeredActions.push(await action.trigger())
        }
        return triggeredActions
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
}

export const instance = new OrderController()
