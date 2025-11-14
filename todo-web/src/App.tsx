import './App.css'
import {useAuth} from "./core/context/auth-context.tsx";
import {AllTasks} from "./features/tasks/components/all-tasks.tsx";
import {AuthPage} from "./features/auth/components/auth-page/auth-page.tsx";
import {ToastContainer} from "react-toastify";
import ReactModal from "react-modal";
import {Header} from "./layouts/header.tsx";

ReactModal.setAppElement('#root');

function App() {

    const context = useAuth();


    let body;

    if (context.user) {
        body = (
            <>
                <button onClick={context.logout}>Выйти</button>
                <AllTasks></AllTasks>
                <ToastContainer></ToastContainer>
            </>

        )
    } else {
        body = (
            <>
                <AuthPage></AuthPage>
                <ToastContainer></ToastContainer>
            </>
        )
    }

    return <>
        <Header></Header>
        <div className="container">
            {body}
        </div>
    </>


}

export default App
