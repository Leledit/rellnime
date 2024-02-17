/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import adapterReleases from "@/app/_adapter/dashboard/releases";
import Link from "next/link";
import UserListingDisplayItems from "../displayItems";
import LoadingComponent from "@/app/_components/general/loading";
import { IDashboardReleases } from "@/app/_interface/returnFromApi";

export default function UserListingHome() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataReleases, setDataReleases] = useState<IDashboardReleases>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataReleases: IDashboardReleases | undefined =
          await adapterReleases();
        setDataReleases(dataReleases);

        setLoading(false);
      } catch (error) {
        console.log("Problemas ao buscar os dados " + error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.containerReleases}>
      {!loading ? (
        dataReleases ? (
          <>
            <div className={styles.segment}>
              <h2 className={styles.segmentTitle}>Animes</h2>
              {dataReleases ? (
                <UserListingDisplayItems listing={dataReleases.dataAnime} />
              ) : (
                <></>
              )}
              <Link
                href={"/home/listing/?all=animes"}
                className={styles.segmentLink}
              >
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
              <Link
                href={"/home/listing/?all=filmes"}
                className={styles.segmentLink}
              >
                Lista completa
              </Link>
            </div>
          </>
        ) : (
          <h3 className={styles.alertMessage}>Nenhum registro encontrado!!</h3>
        )
      ) : (
        <LoadingComponent height={80} width={80} loading={loading} />
      )}
    </div>
  );
}
