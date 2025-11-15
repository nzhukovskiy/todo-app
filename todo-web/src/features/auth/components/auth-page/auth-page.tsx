import {useState} from "react";
import type {FormType} from "../../constants/form-type.ts";
import {Login} from "../login/login.tsx";
import {Register} from "../register/register.tsx";
import styles from "./auth-page.module.css"

export function AuthPage() {
    const [formType, setFormType] = useState<FormType>("LOGIN");

    const form = formType === "LOGIN" ? <Login></Login> : <Register></Register>

    return <>
        <div className={styles.tabs}>
            <div onClick={() => setFormType("LOGIN")} className={formType === "LOGIN" ? styles.active : undefined}>Авторизация</div>
            <div className={styles.separator}></div>
            <div onClick={() => setFormType("REGISTER")} className={formType === "REGISTER" ? styles.active : undefined}>Регистрация</div>
        </div>
        {form}
    </>
}