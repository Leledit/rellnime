/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import adapterReleases from "@/app/_adapter/dashboard/releases";
import Link from "next/link";
import UserListingDisplayItems from "../displayItems";

export default function UserListingHome() {
  const [dataReleases, setDataReleases] = useState<any>();

  useEffect(() => {
    lookingForTheLatestReleases();
  }, []);
  
  return (
    <div className={styles.containerReleases}>
      <div className={styles.segment}>
        <h2 className={styles.segmentTitle}>Animes</h2>
        {dataReleases ? (
          <UserListingDisplayItems listing={dataReleases.dataAnime} />
        ) : (
          <></>
        )}
        <Link href={"/home/listing/?all=animes"} className={styles.segmentLink}>
          Lista completa
        </Link>
      </div>
      <div className={styles.segment}>
        <h2 className={styles.segmentTitle}>Filmes</h2>
        {dataReleases ? (
          <UserListingDisplayItems listing={dataReleases.dataFilmes} />
        ) : (
          <></>
        )}
        <Link href={"/home/listing/?all=filmes"} className={styles.segmentLink}>
          Lista completa
        </Link>
      </div>
    </div>
  );

  async function lookingForTheLatestReleases() {
    const dataReleases = await adapterReleases();
    setDataReleases(dataReleases);
  }
}
