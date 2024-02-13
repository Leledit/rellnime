/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import adapterPopular from "@/app/_adapter/dashboard/popular";
import iconStary from "../../../../../../public/images/user/iconStar.png";

export default function UserSideBarPopular() {
  useEffect(() => {
    getDataFromPopular();
  }, []);

  const [dataPopular, setDataPopular] = useState<any[]>();

  return (
    <div className={styles.containerSideBar}>
      {dataPopular ? (
        <div className={styles.containerPopular}>
          <h3 className={styles.popularTitle}>Populares</h3>
          <div className={styles.containerItens}>
            {dataPopular?.map((item, index) => {
              if (index < 5) {
                return (
                  <Link
                    href={`/home/item/${item.id}`}
                    className={styles.item}
                    key={index}
                  >
                    <img
                      src={item.urlImg}
                      className={styles.itemImg}
                      alt="Imagem do titulo"
                    />
                    <div className={styles.itemInfo}>
                      <p className={styles.itemInfoName}>{item.name}</p>
                      <div className={styles.itemYearAndNot}>
                        <p className={styles.year}>{item.releaseYear}</p>
                        <Image
                          src={iconStary}
                          alt="Icone de uma estrela"
                          className={styles.iconStary}
                        />
                        <p className={styles.note}>{item.note}</p>
                      </div>
                    </div>
                  </Link>
                );
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  async function getDataFromPopular() {
    const resultData = await adapterPopular();
    setDataPopular(resultData);
  }
}
