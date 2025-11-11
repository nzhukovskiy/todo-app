import {NextFunction} from "express";
import {plainToInstance} from "class-transformer";
import {Request, Response} from "express";
import {validate} from "class-validator";

export function validateDtoMiddleware(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(dtoClass, req.body ?? {});

        const errors = await validate(dtoObject);
        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Validation error',
                errors: errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints,
                })),
            });
        }

        (req as any).bodyDTO = dtoObject;
        next();
    };
}