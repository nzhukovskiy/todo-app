import {useAuth} from "../../../../core/context/auth-context.tsx";
import {UserForm} from "../user-form/user-form.tsx";
import type {LoginUserDto} from "../../dtos/login-user.dto.ts";

export function Login() {

    const context = useAuth();

    const login = async (loginUserDto: LoginUserDto) => {
        await context.login(loginUserDto)
    }

    return <UserForm buttonTitle={"Войти"} eventHandler={login} useValidation={false}></UserForm>
}