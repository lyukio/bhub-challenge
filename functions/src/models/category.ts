import { Base, Document } from "./base"

export type CategoryDocument = Document & {
    name: string
}

export class Category extends Base {
    fields: CategoryDocument
    constructor(fields = { name: "" }) {
        super("categories")

        this.fields = {
            name: fields.name,
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
