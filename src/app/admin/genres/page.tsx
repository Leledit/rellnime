"use client";

import { Divider } from "@mui/material";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import adapterListAllGenres from "@/app/_adapter/genres/listAll";
import { IGenre } from "@/app/_interface/dataBd";
import GenreItem from "./item";

export default function PageGenres() {
  const [dataGenres, setDataGenres] = useState<IGenre[]>();

  useEffect(() => {
    searchingAllRegisteredGenres();
  }, []);

  return (
    <div className={styles.containerGenres}>
      <div className={styles.genresHeader}>
        <h2 className={styles.genresHeaderTitle}>Generos Disponiveis</h2>
        <Divider style={{ background: "#7BC0FF" }} />
      </div>
      {dataGenres ? (
        <div className={styles.listGenres}>
            {
                dataGenres.map((iten,index) =>{
                    return <GenreItem dataComponent={iten} key={index} />
                })
            }
        </div>
      ) : (
        <div className={styles.containerMessage}>
          <h2 className={styles.messageText}>
            Nenhum registro foi encontrado!!
          </h2>
        </div>
      )}
    </div>
  );

  async function searchingAllRegisteredGenres() {
    const resultRequest = await adapterListAllGenres();

    if (resultRequest) {
      setDataGenres(resultRequest);
    }

    console.log("---");
    console.log(resultRequest);
  }
}
