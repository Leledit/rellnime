import { CircularProgress } from "@mui/material";
import styles from '../../public/css/loading.module.scss'
export default function Loading(){
    return (
    <div className={styles.containerLoading}>
        <CircularProgress className={styles.loading} />
    </div>
    )
}