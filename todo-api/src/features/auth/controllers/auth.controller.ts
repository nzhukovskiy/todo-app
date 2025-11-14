import {AuthService} from "../services/auth.service";
import {Request, Response} from "express";
import {AppError} from "../../../core/errors/app-errors";

export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    async login(req: Request, res: Response) {
        return res.json(await this.authService.login(req.body));
    }
}