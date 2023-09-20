import { Base, Document } from "./base"
import { Category } from "./category"
import { Product } from "./product"

export type ItemDocument = Document & {
    qt: number
    price: number
    productId: string
    categoryIds: Array<string>
}

export class Item extends Base {
    fields: ItemDocument
    constructor(fields = { qt: 1, price: 0, productId: "", categoryIds: [] }) {
        super("items")

        this.fields = {
            qt: fields.qt,
            price: fields.price,
            productId: fields.productId,
            categoryIds: fields.categoryIds,
        }
        for (const field in this.fields) {
            if (this.fields[field] === undefined) delete this.fields[field]
        }
    }

    async create() {
        this.id = this.fields.id
        return await super.save()
    }

    async save() {
        return await super.save()
    }

    async product() {
        return await new Product().load(this.fields.productId)
    }

    async categories() {
        const categories = []
        for (const categoryId of this.fields.categoryIds) {
            const category = await new Category().load(categoryId)
            if (category) categories.push(category)
        }
        return categories
    }
}
