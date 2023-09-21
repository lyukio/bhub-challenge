import { agent as request } from "supertest"

import { main as app } from "../index"
import { User, UserDocument } from "../models/user"

describe("order", () => {
    beforeAll(async () => {
        const userDto: UserDocument = {
            "name": "fake-name",
            "email": "fake@email.com",
            "address": "fake-address",
        }
        const user = new User(userDto)
        await user.create()
    })

    describe("create order", () => {
        it("should trigger duplicated delivery note when order a book", async () => {
            const dto = {
                "status": "waiting payment",
                "itemIds": ["9Ifw2cLhVSpPzPVmjSnN"],
                "userId": "8XVlsSwUbyvdrtm8nNgH",
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
