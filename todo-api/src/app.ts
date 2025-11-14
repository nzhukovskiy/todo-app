import express from "express"
import "reflect-metadata"
import {Task} from "./features/tasks/models/task";
import {TasksService} from "./features/tasks/services/tasks.service";
import {TasksController} from "./features/tasks/controllers/tasks.controller";
import {User} from "./features/users/models/user";
import {UsersService} from "./features/users/services/users.service";
import {UsersController} from "./features/users/controllers/users.controller";
import {TokenService} from "./features/token/services/token.service";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config({ path: '../.env' });

import DataSource from "./config/data-source";
import {AuthService} from "./features/auth/services/auth.service";
import {AuthController} from "./features/auth/controllers/auth.controller";
import {authRoutes} from "./features/auth/routes/auth-routes";
import {tasksRoutes} from "./features/tasks/routes/tasks-routes";
import {userRoutes} from "./features/users/routes/user-routes";
import {errorHandlerMiddleware} from "./core/middlewares/error-handler.middleware";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
async function start() {
    await DataSource.initialize();
    const tasksRepository = DataSource.getRepository(Task);
    const userRepository = DataSource.getRepository(User);
    const tasksService = new TasksService(tasksRepository);
    const tokenService = new TokenService();
    const usersService = new UsersService(userRepository, tokenService);
    const tasksController = new TasksController(tasksService);
    const usersController = new UsersController(usersService);
    const authService = new AuthService(userRepository, tokenService);
    const authController = new AuthController(authService);

    app.use('/auth', authRoutes(authController));
    app.use('/tasks', tasksRoutes(tasksController, tokenService));
    app.use('/users', userRoutes(usersController));

    app.use(errorHandlerMiddleware());

    app.listen(port, () => {
        console.log(`Express app listening at http://localhost:${port}`);
    });
}

start().then();