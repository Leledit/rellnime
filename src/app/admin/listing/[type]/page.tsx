"use client";
import styles from "./index.module.scss";
import adapterListAllAnime from "@/app/_adapter/anime/listAll";
import ItemList from "@/app/_components/general/itemList";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import adapterListAllFilmes from "@/app/_adapter/films/listAll";

interface IProps {
  params: {
    type: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function PageListingType({ params, searchParams }: IProps) {
  const [dataListingm, setDataListing] = useState<any[]>();
  const typeListing = params.type;

  const router = useRouter();

  useEffect(() => {
    fetchingPageData();
  }, []);

  return (
    <div className={styles.cotainerListing}>
      <div className={styles.listingHeader}>
        <h2 className={styles.listingHeaderTitle}>
          {returnCorrespondingTitle()}
        </h2>
        <Divider style={{ background: "#7BC0FF" }} />
      </div>

      {dataListingm ? (
        <>
          <div className={styles.listingData}>
            {dataListingm.map((item, index) => {
              return (
                <ItemList
                  key={index}
                  id={item.id}
                  img={item.urlImg}
                  name={item.name}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className={styles.containerMessage}>
          <h2 className={styles.messageText}>
            Nenhum registro foi encontrado!!
          </h2>
        </div>
      )}
    </div>
  );

  async function fetchingPageData() {
    let resutlData;
    switch (typeListing) {
      case "allAnime":
        resutlData = await adapterListAllAnime();
        if (resutlData) {
          setDataListing(resutlData);
        }
        break;
      case "allFilms":
        resutlData = await adapterListAllFilmes();
        if (resutlData) {
          setDataListing(resutlData);
        }
        break;
      default:
        router.push("/admin/");
        break;
    }
  }

  function returnCorrespondingTitle() {
    switch (typeListing) {
      case "allAnime":
        return "Animes Cadastrados";
        break;
      case "allFilms":
        return "Filmes Cadastrados";
        break;
    }
  }
}
