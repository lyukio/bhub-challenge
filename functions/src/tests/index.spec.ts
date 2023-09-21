import { agent as request } from "supertest"

import { main as app } from "../index"
import { User, UserDocument } from "../models/user"
// import { Item, ItemDocument } from "../models/item"

describe("order", () => {
    let user: User
    // let item: Item
    beforeAll(async () => {
        const userDto: UserDocument = {
            "name": "fake-name",
            "email": "fake@email.com",
            "address": "fake-address",
        }
        user = new User(userDto)
        await user.create()
        // const itemDto: ItemDocument = {
        //     "qt": 1,
        //     "price": 2.29,
        //     "productId": "fake-product-id",
        //     "categoryIds": ["fake-category-id"],
        // }
        // item = new Item(itemDto)
        // await item.create()
    })

    describe("create order", () => {
        it("should trigger duplicated delivery note when order a book", async () => {
            const dto = {
                "status": "waiting payment",
                "itemIds": ["9Ifw2cLhVSpPzPVmjSnN"],
                "userId": user.id,
            }

            const response = await request(app).post("/orders").send(dto)

            expect(response.status).toBe(200)
            expect(response.body).toEqual(
                expect.objectContaining({
                    order: dto,
                })
            )
        })
    })
})
