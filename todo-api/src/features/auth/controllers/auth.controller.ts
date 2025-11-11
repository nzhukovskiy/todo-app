import {AuthService} from "../services/auth.service";
import {Request, Response} from "express";

export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    async login(req: Request, res: Response) {
        try {
            return res.json(await this.authService.login(req.body));
        }
        catch (e) {
            return res.status(401).json({error: e.message})
        }
    }
}