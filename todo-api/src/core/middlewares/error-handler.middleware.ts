import {NextFunction, Request, Response} from "express";
import {AppError, ServerError} from "../errors/app-errors";

export function errorHandlerMiddleware() {
    return async(error: Error, req: Request, res: Response, next: NextFunction)=> {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({
                message: error.message,
            });
            return;
        }

        const serverError = new ServerError();
        res.status(serverError.statusCode).json({
            message: serverError.message,
        });
    }
}