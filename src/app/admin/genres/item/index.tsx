import { IGenre } from "@/app/_interface/dataBd";
import styles from './index.module.scss';

interface IProps{
    dataComponent: IGenre,
}

export default function GenreItem({dataComponent}:IProps){
    return(
        <div className={styles.containerItem}>
            {dataComponent.name}
        </div>
    )
}