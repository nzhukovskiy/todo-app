import {useEffect, useState} from "react";
import type {Task} from "../models/task.ts";
import {deleteTask, getTasks} from "../api/tasks.api.ts";
import ReactModal from "react-modal"
import {SingleTask} from "./single-task.tsx";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export function AllTasks() {
    const [tasks, setTasks] = useState<Task[] | null>(null);

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const [modalIsOpen, setIsOpen] = useState(false);

    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

    useEffect(() => {
        const loadTasks = async () => {
            const tasks = await getTasks();
            setTasks(tasks);
        }
        loadTasks().then();
    }, [])


    const openTaskModal = (task: Task) => {
        setSelectedTask(task);
        setIsOpen(true);
    }

    const closeTaskModal = () => {
        setSelectedTask(null);
        setIsOpen(false);
    }

    const openDeleteTaskConfirmation = (task: Task) => {
        setSelectedTask(task);
        setConfirmationModalOpen(true);
    }

    const handleConfirmationDialogClose = async (result: boolean) => {
        if (result) {
            await deleteTask(selectedTask!.id);
            setTasks(tasks!.filter(x => x.id !== selectedTask?.id));
        }

        setSelectedTask(null);
        setConfirmationModalOpen(false);
    }

    return <div>
        {
            tasks?.map((task) => (
                <div key={task.id}>
                    <h1 style={{cursor: "pointer"}} onClick={() => openTaskModal(task)}>{task.title}</h1>
                    <div>{task.description}</div>
                    <button onClick={() => openDeleteTaskConfirmation(task)}>Удалить</button>
                </div>
                ))
        }
        <ReactModal isOpen={modalIsOpen} style={customStyles}>
            <SingleTask {...selectedTask} onClose={closeTaskModal}></SingleTask>
        </ReactModal>
        <ReactModal isOpen={confirmationModalOpen} style={customStyles}>
            <h2>Вы уверены?</h2>
            <button onClick={() => handleConfirmationDialogClose(true)}>Подтвердить</button>
            <button onClick={() => handleConfirmationDialogClose(false)}>Отклонить</button>
        </ReactModal>
    </div>
}