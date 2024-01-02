import Link from "next/link";
import styles from "./index.module.scss";

interface props {
  text: string;
  type: "submit" | "button";
  destiny?: string;
}

export default function Button({ text, type, destiny }: props) {
  return (
    <div className={styles.containerButton}>
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
