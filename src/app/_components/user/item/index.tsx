/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import adapterDashboarItem from "@/app/_adapter/dashboard/item";
import Link from "next/link";
import LoadingComponent from "../../general/loading";
import {
  IDashboardItem,
  IEntitieAnime,
  IEntitieFilme,
  IItemListing,
} from "@/app/_interface/returnFromApi";

interface IProps {
  idItem: string;
}

export default function UserItem({ idItem }: IProps) {
  const [dataItem, setDataItem] = useState<IEntitieAnime | IEntitieFilme>();
  const [dataRecomendation, setDataRecomendation] = useState<IItemListing[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: IDashboardItem | undefined = await adapterDashboarItem(
          idItem
        );
        if (result) {
          setDataItem(result.item);
          setDataRecomendation(result.recommendations);
        }
        setLoading(false);
      } catch (error) {
        console.log("Problemas ao buscar os dados " + error);
        setLoading(false);
      }
    };
    fetchData();
  });

  return (
    <div className={styles.containerItem}>
      {!loading ? (
        dataItem ? (
          <>
            <h2 className={styles.mobileTitle}>{dataItem?.name}</h2>
            <div className={styles.containerImgAndInfo}>
              <img
                className={styles.img}
                alt="Imagem que representa um titulo"
                src={dataItem.urlImg}
              />
              <div className={styles.information}>
                <h2 className={styles.desktopTitle}>{dataItem?.name}</h2>
                <div className={styles.containerGenresAndNote}>
                  <div className={styles.containerNote}>
                    <p className={styles.noteLabel}>Nota</p>
                    <p className={styles.noteValue}>{dataItem.note}</p>
                  </div>
                  <div className={styles.containerGenre}>
                    {dataItem.genres ? (
                      dataItem.genres.map((iten: any, index: any) => {
                        return (
                          <div key={index} className={styles.genreItem}>
                            {iten}
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className={styles.containerInformations}>
                  {"qtdEpisodes" in dataItem ? (
                    <p className={styles.info}>
                      <strong>Episodios: </strong>
                      {dataItem.qtdEpisodes}
                    </p>
                  ) : (
                    <></>
                  )}
                  <p className={styles.info}>
                    <strong>Laçamento: </strong>
                    {dataItem.releaseYear}
                  </p>
                  {"status" in dataItem ? (
                    <p className={styles.info}>
                      <strong>Status: </strong>
                      {dataItem.status}
                    </p>
                  ) : (
                    <></>
                  )}
                  {"previousSeason" in dataItem ? (
                    <p className={styles.info}>
                      <strong>Temporada anterior: </strong>
                      {dataItem.previousSeason}
                    </p>
                  ) : (
                    <></>
                  )}
                  {"nextSeason" in dataItem ? (
                    <p className={styles.info}>
                      <strong>Próxima Temporada: </strong>
                      {dataItem.nextSeason}
                    </p>
                  ) : (
                    <></>
                  )}
                  {"watched" in dataItem ? (
                    <p className={styles.info}>
                      <strong>Visto: </strong>
                      {dataItem.watched}
                    </p>
                  ) : (
                    <></>
                  )}

                  {"duration" in dataItem ? (
                    <p className={styles.info}>
                      <strong>Duração: </strong>
                      {dataItem.duration}
                    </p>
                  ) : (
                    <></>
                  )}
                  {"visa" in dataItem ? (
                    <p className={styles.info}>
                      <strong>Visto: </strong>
                      {dataItem.visa ? "Sim" : "Não"}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <hr className={styles.lineDetail} />
            <div className={styles.containerSnops}>
              <h3 className={styles.snopsLabel}>Sinops:</h3>
              <p className={styles.snopsValue}>{dataItem.synopsis}</p>
            </div>
          </>
        ) : (
          <h3 className={styles.message}>Nenhum titulo foi encontrado</h3>
        )
      ) : (
        <LoadingComponent height={80} width={80} loading={loading} />
      )}

      {dataRecomendation ? (
        <div className={styles.containerRecommendations}>
          <h3 className={styles.recommendationsTitle}>Recomendações</h3>
          {dataRecomendation.length === 0 ? (
            <p className={styles.recommendationErrorMessage}>
              Nenhuma recomendação disponivel!
            </p>
          ) : (
            <div className={styles.recommendationsItens}>
              {dataRecomendation.map((iten: any, index: any) => {
                return (
                  <Link
                    href={`/home/item/${iten.id}`}
                    key={index}
                    className={styles.iten}
                  >
                    <img
                      className={styles.itenImg}
                      src={iten.urlImg}
                      alt="Imagem que representa uma recomendação!"
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
