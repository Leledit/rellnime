/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import adapterPopular from "@/app/_adapter/dashboard/popular";
import iconStary from "../../../../../../public/images/user/iconStar.png";
import LoadingComponent from "@/app/_components/general/loading";
import { IDashboardPopular } from "@/app/_interface/returnFromApi";

export default function UserSideBarPopular() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataPopular, setDataPopular] = useState<IDashboardPopular[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultData: IDashboardPopular[] | undefined =
          await adapterPopular(5);
        setDataPopular(resultData);
        setLoading(false);
      } catch (error) {
        console.log("Problemas ao buscar os dados " + error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.containerSideBar}>
      {!loading ? (
        dataPopular ? (
          <div className={styles.containerPopular}>
            <h3 className={styles.popularTitle}>Populares</h3>
            <div className={styles.containerItens}>
              {dataPopular?.map((item, index) => {
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
              })}
            </div>
          </div>
        ) : (
          <></>
        )
      ) : (
        <div className={styles.containerLoading}>
          <LoadingComponent height={60} width={60} loading={loading} />
        </div>
      )}
    </div>
  );
}
