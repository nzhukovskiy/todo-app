import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import styles from "./confirmation-dialog.module.css"

export function ConfirmationDialog({onClose}: {onClose: (result: boolean) => void}) {

    return <>
        <h2 className={styles.title}>Вы уверены?</h2>
        <div className={styles.buttons}>
            <button onClick={() => onClose(true)}><FontAwesomeIcon icon={faCheck} />Подтвердить</button>
            <button onClick={() => onClose(false)}><FontAwesomeIcon icon={faXmark} />Отклонить</button>
        </div>
    </>

}