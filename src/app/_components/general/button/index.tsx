import styles from "./index.module.scss";

interface props {
  text: string;
  type: "submit" | "button";
}

export default function Button({ text, type }: props) {
  return (
    <div className={styles.containerButton}>
      <button className={styles.button} type={type}>
        {text}
      </button>
    </div>
  );
}
