import {NextFunction, Request, Response} from "express";
import {TokenService} from "../../features/token/services/token.service";
import {UnauthorizedError} from "../errors/app-errors";

export function authMiddleware(tokenService: TokenService) {
    return async(req: Request, res: Response, next: NextFunction)=> {
        const token = req.headers.authorization?.split(" ");

        if (!token) {
            throw new UnauthorizedError("No token provided");
        }

        if (token[0] !== "Bearer") {
            throw new UnauthorizedError("Invalid format");
        }
        try {
            (req as any).user = tokenService.verifyToken(token[1]);
            next();
        }
        catch (e) {
            throw new UnauthorizedError("Invalid token");
        }
    }
}