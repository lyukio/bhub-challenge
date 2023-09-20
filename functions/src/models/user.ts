import { Base, Document } from "./base"

export type UserDocument = Document & {
    name: string
    email: string
    address?: string
    admin?: boolean
}

export class User extends Base {
    fields: UserDocument
    constructor(fields: UserDocument) {
        super("users")

        this.fields = {
            name: fields.name,
            email: fields.email,
            address: fields.address ?? undefined,
            admin: fields.admin ?? false,
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
