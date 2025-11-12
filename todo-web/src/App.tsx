import {useEffect, useState} from 'react'
import './App.css'
import {useAuth} from "./core/context/auth-context.tsx";
import {axiosApi} from "./core/api/axios.api.ts";
import {Login} from "./features/auth/components/login.tsx";
import {AllTasks} from "./features/tasks/components/all-tasks.tsx";

function App() {
    const [count, setCount] = useState(0)

    const context = useAuth();

    useEffect(() => {
        console.log(context.user)
        const fetchData = async () => {
            // const tasks = await axiosApi.get('tasks')
        }
        fetchData().then();
    }, [])

    if (context.user) {
        return (
            <>
                <button onClick={context.logout}>Выйти</button>
                <AllTasks></AllTasks>
            </>

        )
    } else {
        return (
            <Login></Login>
        )
    }

}

export default App
