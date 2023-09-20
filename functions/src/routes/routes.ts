import * as express from "express"
import { actionRouter } from "./action"
import { correlationActionRouter } from "./correlationAction"
import { itemRouter } from "./item"
import { orderRouter } from "./order"
import { productRouter } from "./product"
import { userRouter } from "./user"

const app = express()

app.use("/actions", actionRouter)
app.use("/correlationActions", correlationActionRouter)
app.use("/items", itemRouter)
app.use("/orders", orderRouter)
app.use("/products", productRouter)
app.use("/users", userRouter)

export const routes = app
