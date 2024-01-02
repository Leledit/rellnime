import styles from "./index.module.scss";
import Link from "next/link";

interface props {
  text: string;
  destiny: string;
}

export default function FormLink({ text, destiny }: props) {
  return (
    <div className={styles.containerLink}>
      <Link href={destiny} className={styles.linkForgotPassword}>
        {text}
      </Link>
    </div>
  );
}
