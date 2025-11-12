import {useAuth} from "../../core/context/auth-context.tsx";
import {useState} from "react";

export function Login() {

    const context = useAuth();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (event) => {
        event.preventDefault();
        await context.login({email, password})
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return <div>
        <form onSubmit={login}>
            <label htmlFor={'email'}>Адрес электронной почты</label>
            <input id={'email'} type={'email'} onChange={handleEmailChange}/>
            <label htmlFor={'password'}>Пароль</label>
            <input id={'password'} type={'password'} onChange={handlePasswordChange}/>
            <button type={'submit'}>Войти</button>
        </form>
    </div>
}