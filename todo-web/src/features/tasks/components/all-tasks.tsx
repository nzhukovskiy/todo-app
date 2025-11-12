import {useEffect, useState} from "react";
import type {Task} from "../models/task.ts";
import {getTasks} from "../api/tasks.api.ts";

export function AllTasks() {
    const [tasks, setTasks] = useState<Task[] | null>(null);

    useEffect(() => {
        const loadTasks = async () => {
            const tasks = await getTasks();
            setTasks(tasks);
        }
        loadTasks().then();
    }, [])
    return <div>
        {
            tasks?.map((task) => (
                <>
                    <h1>{task.title}</h1>
                    <div>{task.description}</div>
                </>
                ))
        }
    </div>
}