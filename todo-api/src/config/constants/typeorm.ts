import {Task} from "../../features/tasks/models/task";
import {User} from "../../features/users/models/user";

const isProduction = process.env.NODE_ENV === 'production';

console.log(isProduction);
export const entities: any[] = [Task, User];
export const migrations = isProduction ? [__dirname + "/../migrations/*.js"] : ['src/migrations/*.ts'];