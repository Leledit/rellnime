"use client";
import styles from "./index.module.scss";
import imgProviderGoogle from "../../../../../public/images/otherProviders/google.png";
import imgProviderFacebook from "../../../../../public/images/otherProviders/facebook.png";
import Image from "next/image";

interface props {
  parentComponentIdentification: string;
}

export default function AccessByOtherProviders({
  parentComponentIdentification,
}: props) {
  const handleAccessEventWithGoogle = () => {
    console.log("Logando com o gogle");
  };

  const handleAccessEventWithFacebook = () => {
    console.log("Logando com o facebook");
  };

  return (
    <div className={styles.contaner}>
      <h3 className={styles.title}>Se preferir</h3>
      <hr className={styles.divider} />
      <div className={styles.otherProviders}>
        <Image
          className={styles.otherProvidersImg}
          src={imgProviderGoogle}
          alt="Logo do gogle com alguns detalhes"
          onClick={() => {
            handleAccessEventWithGoogle();
          }}
        />
        <Image
          className={styles.otherProvidersImg}
          src={imgProviderFacebook}
          alt="Logo do facebook com alguns detalhes"
          onClick={() => {
            handleAccessEventWithFacebook();
          }}
        />
      </div>
    </div>
  );
}
