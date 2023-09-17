import { instance as controller } from "../controllers/order"
import * as express from "express"

const router = express.Router()
router.post("/", controller.route_postJSON.bind(controller))
router.get("/:id", controller.route_getJSON.bind(controller))
// router.get("/otherExample-examples", controller.route_getOtherExampleExamplesJSON.bind(controller))

export const userRouter = router
