import {Task} from "../../features/tasks/models/task";
import {User} from "../../features/users/models/user";

export const entities: any[] = [Task, User];
export const migrations = ['src/migrations/*.ts'];