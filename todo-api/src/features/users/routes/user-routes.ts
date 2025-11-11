import {validateDtoMiddleware} from "../../../core/middlewares/validate-dto.middleware";
import {CreateUserDto} from "../dtos/create-user.dto";
import {Router} from "express";
import {UsersController} from "../controllers/users.controller";

export function userRoutes(usersController: UsersController) {
    const router = Router();
    router.post('/', validateDtoMiddleware(CreateUserDto), usersController.registerUser.bind(usersController));
    return router;
}