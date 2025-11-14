import {Status} from "../../constants/status.ts";
import styles from "./task-status-badge.module.css"
import {faCheck, faHourglassHalf} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function TaskStatusBadge({status}: {status: Status}) {
    return <div className={`${styles.badge} ${status === Status.pending ? styles.pending: styles.done}`}>
        {status === Status.pending && <div><FontAwesomeIcon icon={faHourglassHalf} />в процессе</div>}
        {status === Status.done && <div><FontAwesomeIcon icon={faCheck} />выполнено</div>}
    </div>
}