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
    constructor(
        status: OrderStatus = OrderStatus.WAITING_PAYMENT,
        itemIds: Array<string> = [],
        userId = "",
    ) {
        super("orders")

        this.fields = {
            status,
            itemIds,
            userId,
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
