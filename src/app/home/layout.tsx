
import UserMenu from "../_components/user/menu";
import styles from "./layout.module.scss";
export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.containerHome}>
      <UserMenu/>
      {children}
    </main>
  );
}
