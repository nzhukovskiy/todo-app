import {Status} from "./status";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/models/user";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.pending,
    })
    status!: Status;

    @ManyToOne(() => User, (user) => user.tasks)
    user!: User;
}