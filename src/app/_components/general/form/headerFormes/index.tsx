import styles from "./index.module.scss";
import smallsoon from "../../../../../../public/images/smalSoon.png";
import Image from "next/image";

interface props {
  titleForm: string;
}

export default function HeaderForms({ titleForm }: props) {
  return (
    <div className={styles.headerForm}>
      <Image
        className={styles.headerFormLogo}
        src={smallsoon}
        alt="Logo do projeto"
      />
      <h1 className={styles.headerFormTitle}>{titleForm}</h1>
    </div>
  );
}
