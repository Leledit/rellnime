"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import AdapterPaginationAnime from "@/app/_adapter/anime/pagination";
import UserListingDisplayItems from "../displayItems";

interface IProps {
  params: any;
}

export default function UserListingPage({ params }: IProps) {
  const limit = 2;
  const _params: any = params;
  const paramAll: string = _params["all"];

  const [dataItens, setDataItens] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecords,setTotalRecords] = useState<number>();

  useEffect(() => {
    searchDataBasedOnParameters(paramAll,);
  }, []);

  return (
    <div className={styles.containerListingPage}>
      <div className={styles.containerListing}>
        <h2 className={styles.listingTitle}>{returnPageTitle(paramAll)}</h2>
            <UserListingDisplayItems listing={dataItens} />
      </div>
    </div>
  );

  async function searchDataBasedOnParameters(paramAll: string) {
    if (paramAll) {
      if (paramAll === "animes") {
        const resultPagAllAnime:any = await AdapterPaginationAnime(currentPage,limit);
        setTotalRecords(resultPagAllAnime.totalRecords);
        setDataItens(resultPagAllAnime.result);
      }
    }
  }

  function returnPageTitle(paramAll: string) {
    if (paramAll) {
      if (paramAll === "animes") {
        return "Lista de anime";
      } else {
        return "Lista de filmes";
      }
    }
    return "";
  }
}
