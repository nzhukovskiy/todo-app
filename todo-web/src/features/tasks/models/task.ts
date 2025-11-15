import type {Status} from "../constants/status.ts";
import {User} from "../../../core/models/user.ts";

export class Task {
    constructor(id: number, title: string, description: string, status: Status, user: User) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.user = user;
    }

    id: number;
    title: string;
    description: string;
    status: Status;
    user: User;
}