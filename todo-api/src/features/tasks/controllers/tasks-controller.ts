import {TasksService} from "../services/tasks-service";

export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    getAll() {
        return this.tasksService.getAllTasks();
    }
}