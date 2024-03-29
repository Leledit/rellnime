"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import AdapterPaginationAnime from "@/app/_adapter/anime/pagination";
import UserListingDisplayItems from "../displayItems";
import AdapterPaginationFilmes from "@/app/_adapter/films/pagination";
import AdapterDashboarListByYear from "@/app/_adapter/dashboard/listByYear";
import AdapterDashboarSearch from "@/app/_adapter/dashboard/search";
import LoadingComponent from "@/app/_components/general/loading";
import { IDataPagination, IItemListing } from "@/app/_interface/returnFromApi";

interface IProps {
  params: any;
}

export default function UserListingPage({ params }: IProps) {
  const limit = 24;
  const _params: any = params;
  const paramAll: string = _params["all"];
  const paramYear: string = _params["year"];
  const paramSearch: string = _params["search"];

  const [dataItens, setDataItens] = useState<IItemListing[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    searchDataBasedOnParameters(
      paramAll,
      paramYear,
      paramSearch,
      currentPage,
      limit
    );
  }, [paramAll, currentPage, paramYear, paramSearch]);

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
    <div className={styles.containerListingPage}>
      <div className={styles.containerListing}>
        <h2 className={styles.listingTitle}>
          {returnPageTitle(paramAll, paramYear, paramSearch)}
        </h2>
        <div className={styles.containerAlignment}>
          {!loading ? (
            dataItens ? (
              <UserListingDisplayItems listing={dataItens} />
            ) : (
              <div className={styles.containerMensagem}>
                <p className={styles.mensagem}>
                  Opss. parece que não encontramos nada no nosso sitemas
                </p>
              </div>
            )
          ) : (
            <LoadingComponent height={80} width={80} loading={loading} />
          )}
        </div>
      </div>
      {totalRecords > limit ? (
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
      )}
    </div>
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

  async function searchDataBasedOnParameters(
    paramAll: string,
    paramYear: string,
    paramSearch: string,
    currentPage: number,
    limit: number
  ) {
    try {
      if (paramAll) {
        if (paramAll === "animes") {
          const resultPagAllAnime: IDataPagination | undefined =
            await AdapterPaginationAnime(currentPage, limit);
          if (resultPagAllAnime) {
            setTotalRecords(resultPagAllAnime.totalRecords);
            setDataItens(resultPagAllAnime.result);
          }
        } else if (paramAll === "filmes") {
          const resultPagAllFilmes: IDataPagination | undefined =
            await AdapterPaginationFilmes(currentPage, limit);
          if (resultPagAllFilmes) {
            setTotalRecords(resultPagAllFilmes.totalRecords);
            setDataItens(resultPagAllFilmes.result);
          }
        }
      }
      if (paramYear) {
        const resultListByYear: IDataPagination | undefined =
          await AdapterDashboarListByYear(
            currentPage,
            limit,
            parseInt(paramYear)
          );
        if (resultListByYear) {
          setTotalRecords(resultListByYear.totalRecords);
          setDataItens(resultListByYear.result);
        } else {
          setTotalRecords(0);
          setDataItens(undefined);
        }
      }
      if (paramSearch) {
        const resultSearch: IDataPagination | undefined =
          await AdapterDashboarSearch(paramSearch, currentPage, limit);
        if (resultSearch) {
          setTotalRecords(resultSearch.totalRecords);
          setDataItens(resultSearch.result);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("Problemas ao buscar os dados " + error);
      setLoading(false);
    }
  }

  function returnPageTitle(
    paramAll: string,
    paramYear: string,
    paramSearch: string
  ) {
    if (paramAll) {
      if (paramAll === "animes") {
        return "Lista de anime";
      } else {
        return "Lista de filmes";
      }
    }
    if (paramYear) {
      return `Titulos lançados no ano de ${paramYear}`;
    }

    if (paramSearch) {
      return `Resultados da busca`;
    }
    return "";
  }
}
