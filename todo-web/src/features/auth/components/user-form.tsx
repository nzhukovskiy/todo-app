import {useForm} from "react-hook-form";
import type {CreateUserDto} from "../dtos/create-user-dto.ts";

export function UserForm({buttonTitle, eventHandler, useValidation}) {

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
                {useValidation ? <input id={'email'} type={'email'} { ...register("email", {
                    required: 'Необходимо ввести адрес электронной почты',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Некорректный адрес электронной почты',
                    },
                })}/>
                    :
                    <input id={'email'} type={'text'} { ...register("email")}/>}
            </div>
            {errors.email && <p>{errors.email.message}</p>}
            <div>
                <label htmlFor={'password'}>Пароль</label>
                {useValidation ?
                    <input id={'password'} type={'password'} {...register('password', {
                        required: 'Необходимо ввести пароль',
                        minLength: {
                            value: 8,
                            message: 'Длина пароля должна быть не меньше 8 символов',
                        },
                    })}/>
                :
                    <input id={'password'} type={'password'} {...register('password')}/>
                }

            </div>
            {errors.password && <p>{errors.password.message}</p>}
            <button type={'submit'}>{buttonTitle}</button>
        </form>
    </div>
}