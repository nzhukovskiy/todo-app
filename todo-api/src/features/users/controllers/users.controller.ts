import {UsersService} from "../services/users.service";
import {Request, Response} from "express";
import {AppError} from "../../../core/errors/app-errors";

export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    async registerUser(req: Request, res: Response) {
        return res.json(await this.usersService.registerUser(req.body));
    }
}