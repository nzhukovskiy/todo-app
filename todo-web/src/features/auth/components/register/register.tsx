import {useAuth} from "../../../../core/context/auth-context.tsx";
import {UserForm} from "../user-form/user-form.tsx";
import type {CreateUserDto} from "../../dtos/create-user-dto.ts";

export function Register() {

    const context = useAuth();

    const register = async (createUserDto: CreateUserDto) => {
        await context.register(createUserDto)
    }

    return <UserForm buttonTitle={"Зарегистрироваться"} eventHandler={register} useValidation={true}></UserForm>


}