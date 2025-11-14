import styles from "./header.module.css"
import {useAuth} from "../core/context/auth-context.tsx";

export function Header() {
    const context = useAuth();

    return <div className={styles.header}>
        <div className={styles.headerContainer}>
            <h1>Task App</h1>
            {context.user && <button onClick={context.logout}>Выйти</button>}
        </div>

    </div>
}