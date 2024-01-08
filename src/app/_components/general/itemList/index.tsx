/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import styles from "./index.module.scss";

interface Iprops {
  img: string | undefined;
  name: string;
  id: string | undefined;
}

export default function ItemList({ img, name, id }: Iprops) {
  return (
    <a href="" className={styles.containerItem}>
      <img src={img} className={styles.itemImg} />
      <div className={styles.itemName}>{name}</div>
    </a>
  );
}
