import {useAuth} from "../../../core/context/auth-context.tsx";
import {UserForm} from "./user-form.tsx";
import type {CreateUserDto} from "../dtos/create-user-dto.ts";

export function Register() {

    const context = useAuth();

    const register = async (createUserDto: CreateUserDto) => {
        await context.register(createUserDto)
    }

    return <div>
        <UserForm buttonTitle={"Зарегистироваться"} eventHandler={register}></UserForm>
    </div>

}