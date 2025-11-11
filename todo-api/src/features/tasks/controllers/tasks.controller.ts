import {TasksService} from "../services/tasks.service";
import {Request, Response} from "express";

export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    async getForUser(req: Request, res: Response) {
        return res.json(await this.tasksService.getForUser());
    }
}