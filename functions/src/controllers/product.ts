import { Request, Response } from "express"
import { Product } from "../models/product"

export class ProductController {
    async route_postJSON(req: Request, res: Response) {
        try {
            const product = new Product(req.body)
            if (!await product.create()) return res.status(422).json({ "response": "error on creating product" })
            product.fields.id = product.id
            return res.json({
                "product": product.fields,
            })
        } catch (error) {
            return res.json({
                error,
            })
        }
    }

    async route_getJSON(req: Request, res: Response) {
        const productId = req.params.id
        if (!productId) return res.status(400).json({ "response": "productId is necessary" })
        const product = new Product()
        if (!await product.load(productId)) return res.status(400).json({ "response": "product not found", productId })
        product.fields.id = product.id
        return res.json({
            "product": product.fields,
        })
    }
}

export const instance = new ProductController()
