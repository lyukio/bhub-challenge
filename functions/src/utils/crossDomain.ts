import { Request, NextFunction, Response } from "express"

export const crossDomain = (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,PATCH")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    // intercept OPTIONS method
    if ("OPTIONS" === req.method) {
        res.sendStatus(200)
    } else {
        next()
    }
}
