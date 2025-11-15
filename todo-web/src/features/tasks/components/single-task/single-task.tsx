import type {Task} from "../../models/task.ts";
import {TaskStatusBadge} from "../task-status-badge/task-status-badge.tsx";
import styles from "./single-task.module.css"
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function SingleTask({onClose, onMarkCompleted, task}: { onClose: () => void; onMarkCompleted: () => void; task: Task}) {
    return <>
        <button className='closeButton' onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button>
        <div className={styles.task}>
            <div className={styles.title}>
                <h1>{task.title}</h1>
                <TaskStatusBadge status={task.status}></TaskStatusBadge>
            </div>
            <div className={styles.description}>{task.description}</div>
            {task.status === "PENDING" && <button onClick={onMarkCompleted}><FontAwesomeIcon icon={faCheck} />Отметить как выполненную</button>}
        </div>

    </>
}