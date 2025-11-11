import {UsersService} from "../services/users.service";
import {Request, Response} from "express";

export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    async registerUser(req: Request, res: Response) {
        try {
            return res.json(await this.usersService.registerUser(req.body));
        }
        catch (e) {
            res.status(409).json({error: e.message})
        }
    }
}