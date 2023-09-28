import { Request, Response } from "express"
import { User } from "../models/user"

export class UserController {
    async route_postJSON(req: Request, res: Response) {
        try {
            const user = new User(req.body)
            if (!await user.create()) return res.status(422).json({ "response": "error on creating user" })
            user.fields.id = user.id
            return res.json({
                "user": user.fields,
            })
        } catch (error) {
            return res.json({
                error,
            })
        }
    }

    async route_getJSON(req: Request, res: Response) {
        const userId = req.params.id
        if (!userId) return res.status(400).json({ "response": "userId is necessary" })
        const user = new User()
        if (!await user.load(userId)) return res.status(400).json({ "response": "user not found", userId })
        user.fields.id = user.id
        return res.json({
            "user": user.fields,
        })
    }

    // TODO: getUserOrders
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

export const instance = new UserController()
