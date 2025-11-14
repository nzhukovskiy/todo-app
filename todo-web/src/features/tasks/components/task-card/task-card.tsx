import type {Task} from "../../models/task.ts";
import styles from "./task-card.module.css"
import {Status} from "../../constants/status.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import {TaskStatusBadge} from "../task-status-badge/task-status-badge.tsx";


export function TaskCard({task, onTaskClick, onEdit, onDelete}:
                             {
                                 task: Task;
                                 onTaskClick: (task: Task) => void;
                                 onEdit: (task: Task) => void;
                                 onDelete: (task: Task) => void;
                             }) {
    return <div className={styles.card}>
        <div className={styles.title}>
            <h1 onClick={() => onTaskClick(task)}>{task.title}</h1>
            <div className={styles.controls}>
                <TaskStatusBadge status={task.status}></TaskStatusBadge>
            </div>
        </div>

        <div className={styles.bottomSection}>
            <div>{task.description.length > 50 ? task.description.substring(0, 50) + "..." : task.description}</div>
            <div>
                <button onClick={() => onEdit(task)}><FontAwesomeIcon icon={faPencil} /></button>
                <button onClick={() => onDelete(task)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>


    </div>
}