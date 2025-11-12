import type {Status} from "../constants/status.ts";
import type {User} from "../../../core/models/user.ts";

export class Task {
    id: number;
    title: string;
    description: string;
    status: Status;
    user: User;
}