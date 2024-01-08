import styles from './index.module.scss';
import smallsoon from "../../../../../public/images/smalSoon.png";
import Image from "next/image";

export default function AdmFooter(){
    return(
        <div className={styles.containerFooter}>
             <div className={styles.internalSpace}>
        <Image
          className={styles.admFooterSoon}
          src={smallsoon}
          alt="Logo do projeto"
        />
        <h2 className={styles.admFooterDescrip}>© 2023 RellNime_Archive. Todos os direitos reservados. O conteúdo deste site é protegido por direitos autorais</h2>
      </div>
        </div>
    )
}