"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import adapterListAllGenres from "@/app/_adapter/genres/listAll";
import AdapterDashboarListByGenre from "@/app/_adapter/dashboard/listByGenre";
import UserListingDisplayItems from "../listing/displayItems";

export default function UserGender() {
  const limit = 24;

  const [availableGenres, setAvailableGenres] = useState<any>();
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataItens, setDataItens] = useState<any>();
  const [totalRecords, setTotalRecords] = useState<number>(0);

  useEffect(() => {
    searchAvailableGenres();
  }, []);

  useEffect(() => {
    async function searchForTitlesOfASpecificGenre(selectedGenre: string) {
      if (selectedGenre !== "") {
        const result: any = await AdapterDashboarListByGenre(
          currentPage,
          limit,
          selectedGenre
        );
        if (result) {
          setDataItens(result.result);
          setTotalRecords(result.totalRecords);
          console.log("----");
          console.log(result.totalRecords);
        }
      }
    }
    searchForTitlesOfASpecificGenre(selectedGenre);
  }, [currentPage, selectedGenre]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage !== totalRecords / limit) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className={styles.containerGenderChoice}>
        <div className={styles.genderenderChoice}>
          <h2 className={styles.genderTitle}>Generos Disponiveis</h2>
          <hr className={styles.genderDetail} />
          <div className={styles.containerGender}>
            {availableGenres?.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className={`${styles.item} ${
                    selectedGenre === item.name ? styles.selectedItem : ""
                  }`}
                  onClick={() => setSelectedGenre(item.name)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {dataItens ? (
        <div className={styles.containerResult}>
          <h2 className={styles.resultTitle}>
            Resultados relacionados ao genero{" "}
            <strong>&quot;{selectedGenre}&quot;</strong>
          </h2>
          <UserListingDisplayItems listing={dataItens} />
        </div>
      ) : (
        <></>
      )}

      {dataItens ? (
        totalRecords > limit ? (
          <div className={styles.containerPages}>
            <div className={styles.pages}>
              <div className={styles.pagePrev} onClick={prevPage}>
                Anterior
              </div>
              {renderPaginationButtons()}
              <div className={styles.pageNext} onClick={nextPage}>
                Próxima
              </div>
            </div>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );

  function renderPaginationButtons() {
    const numButtons = 4; // Quantidade de botões a serem exibidos
    const pageButtons = [];
    const start = Math.max(1, currentPage - Math.floor(numButtons / 2));
    const end = Math.min(totalRecords / limit, start + numButtons - 1);

    for (let i = start; i <= Math.ceil(end); i++) {
      pageButtons.push(
        <div
          className={`${styles.page} ${
            currentPage === i ? styles.selectPag : ""
          }`}
          key={i}
          onClick={() => goToPage(i)}
        >
          {i}
        </div>
      );
    }

    return pageButtons;
  }

  async function searchAvailableGenres() {
    const resultRequest = await adapterListAllGenres();

    if (resultRequest) {
      setAvailableGenres(resultRequest);
    }
  }
}
