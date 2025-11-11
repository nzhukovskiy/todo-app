import {TasksService} from "../services/tasks.service";
import {Request, Response} from "express";

export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    async getForUser(req: Request, res: Response) {
        return res.json(await this.tasksService.getForUser((req as any).user.id));
    }

    async create(req: Request, res: Response) {
        return res.json(await this.tasksService.create((req as any).user.id, req.body));
    }

    async update(req: Request, res: Response) {
        try {
            return res.json(await this.tasksService.update(parseInt(req.params.id), (req as any).user.id, req.body));
        }
        catch (e) {
            return res.status(404).json({error: e.message});
        }
    }

    async markAsDone(req: Request, res: Response) {
        try {
            return res.json(await this.tasksService.markAsDone(parseInt(req.params.id), (req as any).user.id));
        }
        catch (e) {
            return res.status(404).json({error: e.message});
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.tasksService.delete(parseInt(req.params.id), (req as any).user.id);
            return res.status(204).send();
        }
        catch (e) {
            return res.status(404).json({error: e.message});
        }
    }
}