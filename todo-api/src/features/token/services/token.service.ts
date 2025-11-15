import jsonwebtoken from "jsonwebtoken"
export class TokenService {
    private readonly secret: string;
    constructor() {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret not defined");
        }
        this.secret = process.env.JWT_SECRET;
    }
    createToken(payload: any) {
        return jsonwebtoken.sign(payload, this.secret, {expiresIn: "10d"});
    }

    verifyToken(token: string) {
        return jsonwebtoken.verify(token, this.secret);
    }
}