import {Router} from "express";
import {validateDtoMiddleware} from "../../../core/middlewares/validate-dto.middleware";
import {LoginUserDto} from "../dtos/login-user.dto";
import {AuthController} from "../controllers/auth.controller";

export function authRoutes(authController: AuthController) {
    const router = Router();

    router.post('/login', validateDtoMiddleware(LoginUserDto), authController.login.bind(authController));

    return router;
}
