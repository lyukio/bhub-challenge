import * as functions from "firebase-functions"
import * as express from "express"

import { routes as app } from "./routes/routes"
import { middlewareExample } from "./utils/middlewareExample"
import { crossDomain } from "./utils/crossDomain"
import "./database/dbseed"

export const main = express()

main.use(crossDomain)
main.use(middlewareExample)
main.use(app)
export const api = functions.https.onRequest(main)
