import { Base, Document } from "./base"

export type OrderDocument = Document & {
    status: OrderStatus
    productSnaps: Array<object>
    userId?: string
}

export enum OrderStatus {
    WAITING_PAYMENT = "waiting payment",
    PAYMENT_CONFIRMED = "payment confirmed"
}

export class Order extends Base {
    fields: OrderDocument
    constructor(fields = { status: OrderStatus.WAITING_PAYMENT, productSnaps: [], userId: "" }) {
        super("orders")

        this.fields = {
            status: fields.status,
            productSnaps: fields.productSnaps,
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
}
