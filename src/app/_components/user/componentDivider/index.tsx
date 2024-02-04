import styles from "./index.module.scss";

interface IProps {
  mainComponet: any;
  sideBar: any;
}

export default function UserComponentDivider({
  mainComponet,
  sideBar,
}: IProps) {
  return (
    <div className={styles.container}>
      <div className={styles.mainComponent}>{mainComponet}</div>
      <div className={styles.sideBar}>{sideBar}</div>
    </div>
  );
}
