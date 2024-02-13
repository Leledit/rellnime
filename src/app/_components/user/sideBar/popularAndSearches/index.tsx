/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import styles from "./index.module.scss";
import iconMagnifyingGlass from "../../../../../../public/images/user/magnifyingGlass.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import adapterPopular from "@/app/_adapter/dashboard/popular";
import iconStary from "../../../../../../public/images/user/iconStar.png";
import { useRouter } from "next/navigation";

export default function UserSideBarPopularAndSearches() {
  useEffect(() => {
    getDataFromPopular();
  }, []);

  const [valueQuery, setValueQuery] = useState<string>("");
  const [messageError, setMessageError] = useState<string>();
  const [dataPopular, setDataPopular] = useState<any[]>();
  const router = useRouter();

  const yearAvailable: number[] = returnAvailableYears();

  return (
    <div className={styles.containerSideBar}>
      <div className={styles.containerSearch}>
        <div className={styles.searchInput}>
          <input
            type="search"
            className={styles.input}
            placeholder="Buscar"
            value={valueQuery}
            onChange={(e) => {
              setValueQuery(e.target.value);
            }}
          />
          <Image
            alt="icone de uma lupa"
            src={iconMagnifyingGlass}
            className={styles.searchInputIcon}
            onClick={handlingSearchButtonClick}
          />
        </div>
        <p className={styles.searchMensage}>{messageError}</p>
      </div>
      <div className={styles.containerYear} style={{paddingBottom:dataPopular?'0':'50px'}}>
        <h3 className={styles.yearTitle}>Ano</h3>
        <div className={styles.yearItens}>
          {yearAvailable.map((year, index) => {
            return (
              <Link
                href={`/home/listing?year=${year}`}
                className={styles.yearIten}
                key={index}
              >
                {year}
              </Link>
            );
          })}
        </div>
      </div>
      {dataPopular ? (
        <div className={styles.containerPopular}>
          <h3 className={styles.popularTitle}>Populares</h3>
          <div className={styles.containerItens}>
            {dataPopular?.map((item, index) => {
              if (index < 5) {
                return (
                  <Link href={`/home/item/${item.id}`} className={styles.item} key={index}>
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

  function handlingSearchButtonClick() {
    //Realizar redirect, passando o valor da busca como parametro.
    if (valueQuery && valueQuery !== "") {
      router.push(`/home/listing?search=${valueQuery}`);
    } else {
      setMessageError("O campo busca não pode estar vazio!");
    }
  }

  function returnAvailableYears() {
    const date = new Date();
    const year = date.getFullYear();
    const qtdYears = 21;
    let arrayYear: number[] = [];
    for (let i = 0; i < qtdYears; i++) {
      arrayYear.push(year - i);
    }
    return arrayYear;
  }
}
