import type {Task} from "../../models/task.ts";
import {useForm} from "react-hook-form";
import type {CreateTaskDto} from "../../dtos/create-task.dto.ts";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function TaskForm({   task,
                             onSubmit,
                             onClose}
                             :
                             {
                                 task: Task | null ;
                                 onSubmit: (data: CreateTaskDto) => void;
                                 onClose: () => void
                             }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTaskDto>()

    const handleTaskSubmit = (data: CreateTaskDto) => {
        onSubmit(data);
    }

    return (
        <>
            <button className='closeButton' onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button>
            <form onSubmit={handleSubmit(handleTaskSubmit)}>
                <div>
                    <label htmlFor={"title"}>Название</label>
                    <input type={"text"} id={"title"} {...register('title', {
                        required: 'Необходимо ввести название',
                        minLength: {
                            value: 3,
                            message: 'Длина названия должна быть не меньше 3 символов',
                        },
                        value: task ? task.title : ""
                    })}/>
                </div>
                {errors.title && <p>{errors.title.message}</p>}
                <div>
                    <label htmlFor={"description"}>Описание</label>
                    <textarea id={"description"} {...register('description', {
                        value: task ? task.description : ""
                    })}/>
                </div>
                <button type={"submit"}>{task ? "Обновить" : "Создать"}</button>
            </form>
        </>

    )

}