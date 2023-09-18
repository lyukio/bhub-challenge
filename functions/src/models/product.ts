import { Base, Document } from "./base"
import { Category } from "./category"

export type ProductDocument = Document & {
    price: number
    title: string
    categoryId?: string
}

export class Product extends Base {
    fields: ProductDocument
    constructor(fields = { price: 0, title: "", categoryId: undefined }) {
        super("products")

        this.fields = {
            price: fields.price,
            title: fields.title,
            categoryId: fields.categoryId,
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

    async categories() {
        const categories = []
        for (const categoryId of this.fields.categoryIds) {
            const category = await new Category().load(categoryId)
            if (category) categories.push(category)
        }
        return categories
    }
}
