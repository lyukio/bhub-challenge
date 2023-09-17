import { Request, NextFunction, Response } from "express"

export const middlewareExample = (req: Request, res: Response, next: NextFunction) => {
    console.log("passed on middleware")
    next()
}
