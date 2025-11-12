import {useState} from "react";
import {FormType} from "../constants/form-type.ts";
import {Login} from "./login.tsx";
import {Register} from "./register.tsx";

export function AuthPage() {
    const [formType, setFormType] = useState<FormType>(FormType.login);

    const form = formType === FormType.login ? <Login></Login> : <Register></Register>

    const switchFormType = () => {
        setFormType(formType === FormType.login ? FormType.register : FormType.login);
    }

    return <>
        <button onClick={switchFormType}>{formType === FormType.login ? 'Регистрация' : 'Авторизация'}</button>
        {form}
    </>
}