import type {Status} from "../../constants/status.ts";
import styles from "./task-status-badge.module.css"
import {faCheck, faHourglassHalf} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function TaskStatusBadge({status}: {status: Status}) {
    return <div className={`${styles.badge} ${status === "PENDING" ? styles.pending: styles.done}`}>
        {status === "PENDING" && <div><FontAwesomeIcon icon={faHourglassHalf} />в процессе</div>}
        {status === "DONE" && <div><FontAwesomeIcon icon={faCheck} />выполнено</div>}
    </div>
}