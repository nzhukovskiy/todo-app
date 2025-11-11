import {Router} from "express";
import {validateDtoMiddleware} from "../../../core/middlewares/validate-dto.middleware";
import {LoginUserDto} from "../../auth/dtos/login-user.dto";
import {authMiddleware} from "../../../core/middlewares/auth.middleware";
import {CreateTaskDto} from "../dtos/create-task.dto";
import {TasksController} from "../controllers/tasks.controller";
import {TokenService} from "../../token/services/token.service";

export function tasksRoutes(tasksController: TasksController, tokenService: TokenService) {
    const router = Router();

    router.get('/', authMiddleware(tokenService), tasksController.getForUser.bind(tasksController));
    router.post('/', authMiddleware(tokenService), validateDtoMiddleware(CreateTaskDto), tasksController.create.bind(tasksController));
    router.put('/:id', authMiddleware(tokenService), validateDtoMiddleware(CreateTaskDto), tasksController.update.bind(tasksController));
    router.patch('/:id/mark-as-done', authMiddleware(tokenService), tasksController.markAsDone.bind(tasksController));
    router.delete('/:id', authMiddleware(tokenService), tasksController.delete.bind(tasksController));
    return router;
}