import { Base, Document } from "./base"

export type ActionDocument = Document & {
    type: ActionTypes
    data?: object
    desc?: string
}

export enum ActionTypes {
    NONE = "none",
    SEND_EMAIL = "send email",
    DELIVERY_NOTE = "delivery note",
    DUPLICATED_DELIVERY_NOTE = "duplicated delivery note",
    ADD_VIDEO_TO_DELIVERY_NOTE = "add video to delivery note"
}

export class Action extends Base {
    fields: ActionDocument
    constructor(fields = {} as ActionDocument) {
        super("actions")

        this.fields = {
            type: fields.type,
            data: fields.data,
            desc: fields.desc,
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

    async trigger() {
        console.log(`${this.fields.type} event triggered`)
    }
}
