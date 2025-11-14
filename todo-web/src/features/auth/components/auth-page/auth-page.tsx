import {useState} from "react";
import {FormType} from "../../constants/form-type.ts";
import {Login} from "../login/login.tsx";
import {Register} from "../register/register.tsx";
import styles from "./auth-page.module.css"

export function AuthPage() {
    const [formType, setFormType] = useState<FormType>(FormType.login);

    const form = formType === FormType.login ? <Login></Login> : <Register></Register>

    const switchFormType = () => {
        setFormType(formType === FormType.login ? FormType.register : FormType.login);
    }

    return <>
        <div className={styles.tabs}>
            <div onClick={() => setFormType(FormType.login)} className={formType === FormType.login ? styles.active : null}>Авторизация</div>
            <div className={styles.separator}></div>
            <div onClick={() => setFormType(FormType.register)} className={formType === FormType.register ? styles.active : null}>Регистрация</div>
        </div>
        {/*<button onClick={switchFormType}>{formType === FormType.login ? 'Регистрация' : 'Авторизация'}</button>*/}
        {form}
    </>
}