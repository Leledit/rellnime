"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import adapterListAllGenres from "@/app/_adapter/genres/listAll";
import AdapterDashboarListByGenre from "@/app/_adapter/dashboard/listByGenre";
import UserListingDisplayItems from "../listing/displayItems";
import PaginationControls from "../../general/paginationControls";
import LoadingComponent from "../../general/loading";
import {
  IDataPagination,
  IGenre,
  IItemListing,
} from "@/app/_interface/returnFromApi";

export default function UserGender() {
  const limit = 24;

  const [availableGenres, setAvailableGenres] = useState<IGenre[]>();
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataItens, setDataItens] = useState<IItemListing[]>();
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultRequest: IGenre[] | undefined =
          await adapterListAllGenres();

        if (resultRequest) {
          setAvailableGenres(resultRequest);
        }

        setLoading(false);
      } catch (error) {
        console.log("Problemas ao buscar os dados " + error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function searchForTitlesOfASpecificGenre(selectedGenre: string) {
      if (selectedGenre !== "") {
        const result: IDataPagination | undefined =
          await AdapterDashboarListByGenre(currentPage, limit, selectedGenre);
        if (result) {
          setDataItens(result.result);
          setTotalRecords(result.totalRecords);
        }
      }
    }
    searchForTitlesOfASpecificGenre(selectedGenre);
  }, [currentPage, selectedGenre]);

  return (
    <>
      <div className={styles.containerGenderChoice}>
        <div className={styles.genderenderChoice}>
          <h2 className={styles.genderTitle}>Generos Disponiveis</h2>
          <hr className={styles.genderDetail} />

          {!loading ? (
            availableGenres ? (
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
            ) : (
              <></>
            )
          ) : (
            <div className={styles.containerLoading}>
              <LoadingComponent height={60} width={60} loading={loading} />
            </div>
          )}
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
          <PaginationControls
            currentPage={currentPage}
            limit={limit}
            setCurrentPage={setCurrentPage}
            totalRecords={totalRecords}
          />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
}
