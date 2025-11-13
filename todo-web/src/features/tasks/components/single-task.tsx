import type {Task} from "../models/task.ts";

export function SingleTask({onClose, ...task}: { onClose: () => void} & Task) {
    return <>
        <button onClick={onClose}>Закрыть</button>
        <h1>{task.title}</h1>
        <div>{task.description}</div>
        <div>{task.status}</div>
    </>
}