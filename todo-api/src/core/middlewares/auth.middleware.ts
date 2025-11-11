import {NextFunction, Request, Response} from "express";
import {TokenService} from "../../features/token/services/token.service";

export function authMiddleware(tokenService: TokenService) {
    return async(req: Request, res: Response, next: NextFunction)=> {
        const token = req.headers.authorization?.split(" ");

        if (!token) {
            return res.status(401).json({error: "No token provided"});
        }

        if (token[0] !== "Bearer") {
            return res.status(401).json({error: "Invalid format"})
        }
        try {
            (req as any).user = tokenService.verifyToken(token[1]);
            next();
        }
        catch (e) {
            res.status(401).json({error: "Invalid token"});
        }
    }
}