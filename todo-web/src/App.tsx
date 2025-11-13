import './App.css'
import {useAuth} from "./core/context/auth-context.tsx";
import {AllTasks} from "./features/tasks/components/all-tasks.tsx";
import {AuthPage} from "./features/auth/components/auth-page.tsx";
import {ToastContainer} from "react-toastify";

function App() {

    const context = useAuth();

    if (context.user) {
        return (
            <>
                <button onClick={context.logout}>Выйти</button>
                <AllTasks></AllTasks>
                <ToastContainer></ToastContainer>
            </>

        )
    } else {
        return (
            <>
                <AuthPage></AuthPage>
                <ToastContainer></ToastContainer>
            </>
        )
    }

}

export default App
