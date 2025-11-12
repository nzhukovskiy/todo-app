import {useForm} from "react-hook-form";
import type {CreateUserDto} from "../dtos/create-user-dto.ts";

export function UserForm({buttonTitle, eventHandler}) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CreateUserDto>()

    const handleUserEvent = async (data) => {
        eventHandler({email: data.email, password: data.password});
    }

    return <div>
        <form onSubmit={handleSubmit(handleUserEvent)}>
            <div>
                <label htmlFor={'email'}>Адрес электронной почты</label>
                <input id={'email'} type={'email'} {...register("email", {
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Некорректный адрес электронной почты',
                    },
                })}/>
            </div>
            {errors.email && <p>{errors.email.message}</p>}
            <div>
                <label htmlFor={'password'}>Пароль</label>
                <input id={'password'} type={'password'} {...register('password', {
                    minLength: {
                        value: 8,
                        message: 'Длина пароля должна быть не меньше 8 символов',
                    },
                })}/>
            </div>
            {errors.password && <p>{errors.password.message}</p>}
            <button type={'submit'}>{buttonTitle}</button>
        </form>
    </div>
}