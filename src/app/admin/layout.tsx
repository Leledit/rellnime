import AdmFooter from "../_components/adm/footer";
import AdmMenu from "../_components/adm/menu";
import styles from "./layout.module.scss";
export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.containerAdmin}>
      <AdmMenu />
      {children}
      <AdmFooter />
    </div>
  );
}
