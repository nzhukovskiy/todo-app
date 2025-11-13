import type {Task} from "../models/task.ts";
import {Status} from "../constants/status.ts";

export function SingleTask({onClose, onMarkCompleted, ...task}: { onClose: () => void} & { onMarkCompleted: () => void} & Task) {
    return <>
        <button onClick={onClose}>Закрыть</button>
        <h1>{task.title}</h1>
        <div>{task.description}</div>
        <div>{task.status}</div>
        {task.status === Status.pending && <button onClick={onMarkCompleted}>Отметить как выполенную</button>}
    </>
}