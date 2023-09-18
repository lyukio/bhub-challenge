import * as express from "express"
import { userRouter } from "./user"
import { orderRouter } from "./order"
import { itemRouter } from "./item"

const app = express()

app.use("/users", userRouter)
app.use("/orders", orderRouter)
app.use("/items", itemRouter)

export const routes = app
