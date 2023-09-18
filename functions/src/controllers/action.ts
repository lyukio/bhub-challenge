import { Request, Response } from "express"
import { Action } from "../models/action"

export class ActionController {
    async route_postJSON(req: Request, res: Response) {
        try {
            const action = new Action(req.body)
            if (!await action.create()) return res.status(422).json({ "response": "error on creating action" })
            action.fields.id = action.id
            return res.json({
                "action": action.fields,
            })
        } catch (error) {
            return res.json({
                error,
            })
        }
    }

    async route_getJSON(req: Request, res: Response) {
        const actionId = req.params.id
        if (!actionId) return res.status(400).json({ "response": "actionId is necessary" })
        const action = new Action()
        if (!await action.load(actionId)) return res.status(400).json({ "response": "action not found", actionId })
        action.fields.id = action.id
        return res.json({
            "action": action.fields,
        })
    }
}

export const instance = new ActionController()
