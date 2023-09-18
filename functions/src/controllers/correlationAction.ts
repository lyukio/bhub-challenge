import { Request, Response } from "express"
import { CorrelationAction } from "../models/correlationAction"

export class CorrelationActionController {
    async route_postJSON(req: Request, res: Response) {
        try {
            const correlationAction = new CorrelationAction(req.body)
            if (!await correlationAction.create()) return res.status(422).json({ "response": "error on creating correlationAction" })
            correlationAction.fields.id = correlationAction.id
            return res.json({
                "correlationAction": correlationAction.fields,
            })
        } catch (error) {
            return res.json({
                error,
            })
        }
    }

    async route_getJSON(req: Request, res: Response) {
        const correlationActionId = req.params.id
        if (!correlationActionId) return res.status(400).json({ "response": "actionId is necessary" })
        const correlationAction = new CorrelationAction()
        if (!await correlationAction.load(correlationActionId)) {
            return res.status(400).json({ "response": "correlationAction not found", correlationActionId })
        }
        correlationAction.fields.id = correlationAction.id
        return res.json({
            "correlationAction": correlationAction.fields,
        })
    }
}

export const instance = new CorrelationActionController()
