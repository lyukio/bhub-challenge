import { instance as controller } from "../controllers/correlationAction"
import * as express from "express"

const router = express.Router()
router.post("/", controller.route_postJSON.bind(controller))
router.get("/:id", controller.route_getJSON.bind(controller))

export const correlationActionRouter = router
