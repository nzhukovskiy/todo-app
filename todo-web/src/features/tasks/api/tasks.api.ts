import {axiosApi} from "../../../core/api/axios.api.ts";

export async function getTasks() {
    const tasks = await axiosApi.get('tasks');
    return tasks.data;
}