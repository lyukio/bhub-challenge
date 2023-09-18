import { Request, Response } from "express"
import { Item } from "../models/item"

export class ItemController {
    async route_postJSON(req: Request, res: Response) {
        try {
            const item = new Item(req.body)
            if (!await item.create()) return res.status(422).json({ "response": "error on creating item" })
            item.fields.id = item.id
            return res.json({
                "item": item.fields,
            })
        } catch (error) {
            return res.json({
                error,
            })
        }
    }

    async route_getJSON(req: Request, res: Response) {
        const itemId = req.params.id
        if (!itemId) return res.status(400).json({ "response": "itemId is necessary" })
        const item = new Item()
        if (!await item.load(itemId)) return res.status(400).json({ "response": "item not found", itemId })
        item.fields.id = item.id
        return res.json({
            "item": item.fields,
        })
    }
}

export const instance = new ItemController()
