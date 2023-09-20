import { Action } from "./action"
import { Base, Document } from "./base"
import { Category } from "./category"
import { Product } from "./product"

export type CorrelationActionDocument = Document & {
    entity: EntityTypes
    entityId: string
    actionId: string
}

export enum EntityTypes {
    PRODUCT = "product",
    CATEGORY = "category",
}

export class CorrelationAction extends Base {
    fields: CorrelationActionDocument
    constructor(fields = { entity: EntityTypes.PRODUCT, entityId: "", actionId: "" }) {
        super("correlationActions")

        this.fields = {
            entity: fields.entity,
            entityId: fields.entityId,
            actionId: fields.actionId,
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

    async loadByProducts(products: Array<Product>, loadByCategory = true): Promise<Array<CorrelationAction>> {
        const correlationActions: Array<CorrelationAction> = []
        for (const product of products) {
            const productCorrelationAction = await this.loadByEntity(EntityTypes.PRODUCT, product.id)
            if (productCorrelationAction) correlationActions.push(productCorrelationAction)
        }
        return correlationActions
    }

    async loadByCategories(categories: Array<Category>) {
        const correlationActions: Array<CorrelationAction> = []
        for (const category of categories) {
            const categoryCorrelationAction = await this.loadByEntity(EntityTypes.CATEGORY, category.id)
            if (categoryCorrelationAction) correlationActions.push(categoryCorrelationAction)
        }
        return correlationActions
    }

    async loadByEntity(entityType: EntityTypes, entityId: string) {
        const correlationAction = await this.loadByProperty("entityId", entityId)
        if (correlationAction?.fields?.entity === entityType) return correlationAction
        return undefined
    }

    async action() {
        return await new Action().load(this.fields.actionId)
    }
}
