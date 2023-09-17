import * as express from "express"
import { userRouter } from "./user"

const app = express()

app.use("/users", userRouter)

export const routes = app
