import Link from "next/link";
import styles from "./index.module.scss";

interface props {
  text: string;
  type: "submit" | "button";
  destiny?: string;
  customClassComponent?: any;
}

export default function Button({
  text,
  type,
  destiny,
  customClassComponent,
}: props) {
  return (
    <div className={styles.containerButton + " " + customClassComponent}>
      {destiny ? (
        <>
          <Link href={destiny} className={styles.linkButton}>
            {text}
          </Link>
        </>
      ) : (
        <>
          <button className={styles.button} type={type}>
            {text}
          </button>
        </>
      )}
    </div>
  );
}
