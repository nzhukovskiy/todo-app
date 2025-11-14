import {Repository} from "typeorm";
import {Task} from "../models/task";
import {CreateTaskDto} from "../dtos/create-task.dto";
import {Status} from "../models/status";
import {NotFoundError} from "../../../core/errors/app-errors";

export class TasksService {

    constructor(private readonly taskRepository: Repository<Task>) {
    }
    async getForUser(userId: number) {
        return await this.taskRepository.find({where: {user: {id: userId}}});
    }

    async getOne(id: number, userId: number) {
        return await this.getTaskAndCheckOwnership(id, userId, true);
    }

    async create(userId: number, createTaskDto: CreateTaskDto) {
        let task = await this.taskRepository.create(createTaskDto);
        task.userId = userId;
        return await this.taskRepository.save(task);
    }

    async update(id: number, userId: number, createTaskDto: CreateTaskDto) {
        let task = await this.getTaskAndCheckOwnership(id, userId);
        Object.assign(task, createTaskDto);
        return await this.taskRepository.save(task);
    }

    async markAsDone(id: number, userId: number) {
        let task = await this.getTaskAndCheckOwnership(id, userId);
        task.status = Status.done;
        return await this.taskRepository.save(task);
    }

    async delete(id: number, userId: number) {
        let task = await this.getTaskAndCheckOwnership(id, userId);
        await this.taskRepository.remove(task);
    }

    private async getTaskAndCheckOwnership(id: number, userId: number, selectUser = false) {
        const task = selectUser ?
            await this.taskRepository.findOne( {
                where: { id },
                relations: {user: true},
                select: {
                    user: {
                        password: false,
                        id: true,
                        email: true
                    }
                }
            })
            : await this.taskRepository.findOneBy( { id });
        if (!task || task.userId !== userId) {
            throw new NotFoundError("Task not found");
        }
        return task;
    }
}