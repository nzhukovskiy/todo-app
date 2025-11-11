import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Task} from "../../tasks/models/task";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[];
}