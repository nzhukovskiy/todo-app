import express from "express"
import "reflect-metadata"
import {Task} from "./features/tasks/models/task";
import {TasksService} from "./features/tasks/services/tasks.service";
import {TasksController} from "./features/tasks/controllers/tasks.controller";
import {User} from "./features/users/models/user";
import {UsersService} from "./features/users/services/users.service";
import {UsersController} from "./features/users/controllers/users.controller";
import {TokenService} from "./features/token/services/token.service";
import {validateDtoMiddleware} from "./core/middlewares/validate-dto.middleware";
import {CreateUserDto} from "./features/users/dtos/create-user.dto";
import dotenv from "dotenv";

dotenv.config({ path: '.env' });

import DataSource from "./config/data-source";
import {authMiddleware} from "./core/middlewares/auth.middleware";
import {AuthService} from "./features/auth/services/auth.service";
import {AuthController} from "./features/auth/controllers/auth.controller";
import {LoginUserDto} from "./features/auth/dtos/login-user.dto";

const app = express();
const port = 3000;

app.use(express.json());

const router= app.router;

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



    router.get('/tasks', authMiddleware(tokenService), tasksController.getForUser.bind(tasksController));
    router.post('/users', validateDtoMiddleware(CreateUserDto), usersController.registerUser.bind(usersController));
    router.post('/auth/login', validateDtoMiddleware(LoginUserDto), authController.login.bind(authController));

    app.get('/', (req, res) => {
        res.send('Hello from Express!');
    });

    app.listen(port, () => {
        console.log(`Express app listening at http://localhost:${port}`);
    });
}


start().then();