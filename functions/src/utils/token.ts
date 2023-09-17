import * as jwt from "jsonwebtoken"

export type TokenPayload = {
    [key: string]: any
    userId: string
}
export class Token {
    private static secret = "secretKey"
    static generate(payload: TokenPayload, expiresIn = "24h") {
        const token = jwt.sign(payload, this.secret, { expiresIn })
        return token
    }

    static validate(token: string) {
        try {
            return jwt.verify(token, this.secret)
        } catch (err) {
            return null
        }
    }
}
