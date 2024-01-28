/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { MouseEvent } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";

interface Iprops {
  img: string | undefined;
  name: string;
  id: string | undefined;
  applicationSegment: string;
  isAnime: boolean;
}

export default function ItemList({
  img,
  name,
  id,
  applicationSegment,
  isAnime,
}: Iprops) {
  const router = useRouter();

  const handleComponentClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (applicationSegment === "ADM") {
      if (isAnime) {
        router.push(`/admin/anime/item?id=${id}`);
      } else {
        router.push(`/admin/films/item?id=${id}`);
      }
    } else {
    }
  };

  return (
    <a
      onClick={(e) => {
        handleComponentClick(e);
      }}
      className={styles.containerItem}
    >
      <img src={img} className={styles.itemImg} />
      <div className={styles.itemName}>{name}</div>
    </a>
  );
}
