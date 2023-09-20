import { Base, Document } from "./base"
import { Item } from "./item"

export type OrderDocument = Document & {
    status: OrderStatus
    itemIds: Array<string>
    userId: string
}

export enum OrderStatus {
    WAITING_PAYMENT = "waiting payment",
    PAYMENT_CONFIRMED = "payment confirmed"
}

export class Order extends Base {
    fields: OrderDocument
    constructor(fields: OrderDocument = { status: OrderStatus.WAITING_PAYMENT, itemIds: [], userId: "" }) {
        super("orders")

        this.fields = {
            status: fields.status,
            itemIds: fields.itemIds,
            userId: fields.userId,
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

    async items() {
        const items = []
        for (const itemId of this.fields.itemIds) {
            const item = await new Item().load(itemId)
            if (item) items.push(item)
        }
        return items
    }

    async products() {
        const products = []
        for (const itemId of this.fields.itemIds) {
            const itemInstance = new Item()
            const item = await itemInstance.load(itemId)
            if (!item) continue
            const product = await item.product()
            if (!product) continue
            products.push(product)
        }
        return products
    }

    async categories() {
        const categories = []
        for (const itemId of this.fields.itemIds) {
            const itemInstance = new Item()
            const item = await itemInstance.load(itemId)
            if (!item) continue
            const itemCategories = await item.categories()
            if (!itemCategories) continue
            categories.push(...itemCategories)
        }
        return categories
    }
}
