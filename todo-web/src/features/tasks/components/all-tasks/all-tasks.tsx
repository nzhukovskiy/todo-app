import {useEffect, useState} from "react";
import type {Task} from "../../models/task.ts";
import {createTask, deleteTask, getTasks, markAsCompleted, updateTask} from "../../api/tasks.api.ts";
import ReactModal from "react-modal"
import {SingleTask} from "../single-task/single-task.tsx";
import {TaskForm} from "../task-form/task-form.tsx";
import type {CreateTaskDto} from "../../dtos/create-task.dto.ts";
import {TaskCard} from "../task-card/task-card.tsx";
import {ConfirmationDialog} from "../../../shared/components/confirmation-dialog/confirmation-dialog.tsx";
import styles from "./all-tasks.module.css"
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const customStyles = {
    content: {
        width: '100%',
        maxWidth: '540px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const confirmationDialogStyles = {
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

    const [taskFormModalOpen, setTaskFormModalOpen] = useState(false);

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

    const handleCompletion = async () => {
        const task = await markAsCompleted(selectedTask!.id);
        setTasks(tasks!.map(x => {
            if (x.id === task.id) {
                return task;
            }
            return x;
        }));
        setSelectedTask(task);
    }

    const handleTaskSubmit = async (createTaskDto: CreateTaskDto) => {
        if (selectedTask) {
            const task = await updateTask(selectedTask!.id, createTaskDto);
            setTasks(tasks!.map(x => {
                if (x.id === task.id) {
                    return task;
                }
                return x;
            }));
        }
        else {
            const task = await createTask(createTaskDto);
            setTasks(tasks!.concat(task));
        }
        setSelectedTask(null);
        setTaskFormModalOpen(false);
    }

    const openTaskFormModal = (task: Task) => {
        setSelectedTask(task);
        setTaskFormModalOpen(true);
    }

    const closeTaskFormModal = () => {
        setSelectedTask(null);
        setTaskFormModalOpen(false);
    }

    return <div>
        <button className={styles.newTaskButton} onClick={() => setTaskFormModalOpen(true)}><FontAwesomeIcon icon={faPlus} />Создать новую задачу</button>
        {
            tasks?.map((task) => (
                <TaskCard key={task.id} task={task} onTaskClick={openTaskModal} onEdit={openTaskFormModal} onDelete={openDeleteTaskConfirmation}></TaskCard>
            ))
        }
        <ReactModal isOpen={modalIsOpen} style={customStyles}>
            <SingleTask {...selectedTask} onClose={closeTaskModal} onMarkCompleted={handleCompletion}></SingleTask>
        </ReactModal>
        <ReactModal isOpen={confirmationModalOpen} style={confirmationDialogStyles}>
            <ConfirmationDialog onClose={handleConfirmationDialogClose}></ConfirmationDialog>
        </ReactModal>
        <ReactModal isOpen={taskFormModalOpen} style={customStyles}>
            <TaskForm task={selectedTask} onSubmit={handleTaskSubmit} onClose={closeTaskFormModal}></TaskForm>
        </ReactModal>
    </div>
}