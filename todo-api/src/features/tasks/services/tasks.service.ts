import {Repository} from "typeorm";
import {Task} from "../models/task";

export class TasksService {

    constructor(private readonly taskRepository: Repository<Task>) {
    }
    async getForUser(userId: number) {
        return await this.taskRepository.find({where: {user: {id: userId}}});
    }
}