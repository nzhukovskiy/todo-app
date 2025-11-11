import jsonwebtoken from "jsonwebtoken"
export class TokenService {
    createToken(payload: any) {
        return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: "10d"});
    }

    verifyToken(token: string) {
        return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    }
}