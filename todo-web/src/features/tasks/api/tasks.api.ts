import {axiosApi} from "../../../core/api/axios.api.ts";
import type {CreateTaskDto} from "../dtos/create-task.dto.ts";
import type {UpdateTaskDto} from "../dtos/update-task.dto.ts";

export async function getTasks() {
    const tasks = await axiosApi.get('tasks');
    return tasks.data;
}

export async function deleteTask(id: number) {
    await axiosApi.delete(`tasks/${id}`);
}

export async function markAsCompleted(id: number) {
    const task = await axiosApi.patch(`tasks/${id}/mark-as-done`);
    return task.data;
}

export async function createTask(createTaskDto: CreateTaskDto) {
    const task = await axiosApi.post(`tasks`, createTaskDto);
    return task.data;
}

export async function updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await axiosApi.put(`tasks/${id}`, updateTaskDto);
    return task.data;
}