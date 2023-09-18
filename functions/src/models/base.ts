import { db as _db } from "../main"
import { Timestamp } from "firebase-admin/firestore"

export type Document = FirebaseFirestore.DocumentData & {
    createdAt?: Timestamp,
    updatedAt?: Timestamp
}
export abstract class Base {
    id = ""
    fields: Document | FirebaseFirestore.DocumentData
    readonly db: FirebaseFirestore.CollectionReference
    constructor(context: string) {
        this.db = _db.collection(context)
        this.fields = {}
    }

    ref() {
        if (this.id.length < 0) {
            const doc = this.db.doc()
            this.id = doc.id
            return doc
        }
        return this.db.doc(this.id)
    }

    async save() {
        if (this.id) {
            if (!this.fields.createdAt) {
                this.fields.createdAt = Timestamp.now()
            } else {
                this.fields.updatedAt = Timestamp.now()
            }
            await this.db.doc(this.id).set(this.fields, { merge: true })
            return true
        }
        this.fields.createdAt = Timestamp.now()
        const docRef = await this.db.add(this.fields)
        this.id = docRef.id
        return true
    }

    async load(id: string) {
        const doc = (await this.db.doc(id).get()).data()
        if (!doc) return null
        this.fields = doc
        this.id = id
        return this
    }

    async delete(id: string) {
        return await this.db.doc(id).delete()
    }

    async loadAll() {
        const snap = await this.db.get()
        if (!snap) return null
        const docs: any[] = []
        snap.docs.forEach(doc => {
            const fields = doc.data()
            fields.id = doc.id
            docs.push({ id: doc.id, fields })
        })
        if (docs.length === 1) return docs[0]
        if (docs instanceof Array && docs.length === 0) return false
        return docs
    }

    async loadByProperty(property: string, value: any) {
        const snap = await this.db.where(property, "==", value).get()
        if (!snap) return null
        const docs: any[] = []
        snap.forEach(doc => {
            const fields = doc.data()
            fields.id = doc.id
            docs.push({ id: doc.id, fields })
        })
        if (docs.length === 1) return docs[0]
        if (docs instanceof Array && docs.length === 0) return false
        return docs
    }

    async loadContainsInProperty(property: string, value: any) {
        const snap = await this.db.get()
        if (!snap) return null
        const docs: any[] = []
        snap.forEach(doc => {
            const fields = doc.data()
            if (fields[property].every((item: any) => item !== value)) return
            fields.id = doc.id
            docs.push({ id: doc.id, fields })
        })
        if (docs.length === 1) return docs[0]
        if (docs instanceof Array && docs.length === 0) return false
        return docs
    }
}
