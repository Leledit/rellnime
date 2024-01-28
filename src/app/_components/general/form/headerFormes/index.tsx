import Image from "next/image";
import styles from "./index.module.scss";
import { CSSProperties } from "styled-components";
import smallsoon from "../../../../../../public/images/smalSoon.png";

interface props {
  titleForm: string;
  customStylesTitle?: CSSProperties | undefined;
}

export default function HeaderForms({ titleForm, customStylesTitle }: props) {
  return (
    <div className={styles.headerForm}>
      <Image
        className={styles.headerFormLogo}
        src={smallsoon}
        alt="Logo do projeto"
      />
      <h1 className={styles.headerFormTitle} style={customStylesTitle}>
        {titleForm}
      </h1>
    </div>
  );
}
