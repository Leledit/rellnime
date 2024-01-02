import styles from "./index.module.scss";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.containerLayout}>
      <div className={styles.contantInfo}>
        <div className={styles.breathingSpace}>{children}</div>
      </div>
    </main>
  );
}
