import { agent as request } from "supertest"

import { main as app } from "../index"
import { User, UserDocument } from "../models/user"
import { Item, ItemDocument } from "../models/item"
import { Category, CategoryDocument } from "../models/category"
import { Product, ProductDocument } from "../models/product"
import { Action, ActionDocument, ActionTypes } from "../models/action"
import { CorrelationAction, CorrelationActionDocument, EntityTypes } from "../models/correlationAction"

describe("order", () => {
    let user: User
    let category: Category
    let item: Item
    let product: Product
    let action: Action
    let correlationAction: CorrelationAction

    beforeAll(async () => {
        const userDto: UserDocument = {
            "name": "fake-name",
            "email": "fake@email.com",
            "address": "fake-address",
        }
        user = new User(userDto)
        await user.create()

        const categoryDto: CategoryDocument = {
            "name": "book",
        }
        category = new Category(categoryDto)
        await category.create()

        const productDto: ProductDocument = {
            "price": 2.29,
            "title": "Livro Javascript Assertivo",
            "categoryIds": [category.id],
        }
        product = new Product(productDto)
        await product.create()

        const itemDto: ItemDocument = {
            "qt": 1,
            "price": 2.29,
            "productId": product.id,
            "categoryIds": [category.id],
        }
        item = new Item(itemDto)
        await item.create()

        const actionDto: ActionDocument = {
            "desc": "Gera uma guia de remessa duplicada",
            "type": ActionTypes.DUPLICATED_DELIVERY_NOTE,
            "data": {
                item: item.fields,
            },
        }
        action = new Action(actionDto)
        await action.create()

        const correlationActionDto: CorrelationActionDocument = {
            "entity": EntityTypes.PRODUCT,
            "entityId": product.id,
            "actionId": action.id,
        }
        correlationAction = new CorrelationAction(correlationActionDto)
        await correlationAction.create()
    })

    describe("create order", () => {
        it("should trigger duplicated delivery note when order a book", async () => {
            const dto = {
                "status": "waiting payment",
                "itemIds": [item.id],
                "userId": user.id,
            }

            const response = await request(app).post("/orders").send(dto)

            expect(response.status).toBe(200)
            expect(response.body).toEqual({
                order: expect.objectContaining(dto),
                triggeredActions: [
                    ActionTypes.DUPLICATED_DELIVERY_NOTE,
                ],
            })
        })
    })
})
