"use client";
import { IEntitieAnime, IEntitieFilme } from "@/app/_interface/dataBd";
import styles from "./index.module.scss";
import { Divider } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import AdmPopUpAddGenre from "../popUp/addGenreInItem";
import AdmPopUpDeleteGenre from "../popUp/deleteGenreInItem";
import AdmPopUpDeleteItem from "../popUp/deleteItem";

interface props {
  typeIten: "anime" | "filme";

  dataItem: IEntitieAnime | IEntitieFilme;
}

export default function AdmItem({ typeIten, dataItem }: props) {
  const router = useRouter();
  const [openModalAddGenre, setOpenModalAddGenre] = useState<boolean>(false);
  const [openModalDeleteGenre, setOpenModalDeleteGenre] =
    useState<boolean>(false);
  const [selectedtGenre, setSelectedGenre] = useState<string>("");
  const [openPopUpDelete, setOpenPopUpDelete] = useState<boolean>(false);

  return (
    <>
      <AdmPopUpAddGenre
        onClosed={closedPopUpAddGender}
        open={openModalAddGenre}
        typeIten={typeIten}
        idItem={dataItem.id}
      />
      <AdmPopUpDeleteGenre
        onClosed={closedPopUpDeleteGender}
        open={openModalDeleteGenre}
        typeIten={typeIten}
        nameItem={dataItem.name}
        nameGenre={selectedtGenre}
        idItem={dataItem.id}
      />
      <div className={styles.containerItem}>
        <div className={styles.internalSpace}>
          <h2 className={styles.itemTitle}>{dataItem.name}</h2>
          <div className={styles.containerInfo}>
            <img
              className={styles.infoImg}
              alt={`Imagem do titulo: ${dataItem.name}`}
              src={dataItem.urlImg}
            />
            <div className={styles.informations}>
              <div className={styles.noteAndButton}>
                <div className={styles.note}>
                  <div className={styles.noteTitle}>Nota</div>
                  <div className={styles.noteValue}>
                    {dataItem.note ? dataItem.note : "0"}
                  </div>
                </div>
                <div className={styles.containerButtons}>
                  <button
                    className={styles.button}
                    onClick={(e) => {
                      handleInformationChangeEvent(e);
                    }}
                  >
                    Alterar informações
                  </button>
                  <button
                    className={styles.button}
                    onClick={(e) => {
                      setOpenPopUpDelete(true);
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </div>
              <div className={styles.listInfos}>
                {"qtdEpisodes" in dataItem ? (
                  <p className={styles.listInfo}>
                    <strong>Episodios: </strong>
                    {dataItem.qtdEpisodes}
                  </p>
                ) : (
                  <></>
                )}
                <p className={styles.listInfo}>
                  <strong>Laçamento: </strong>
                  {dataItem.releaseYear}
                </p>
                {"status" in dataItem ? (
                  <p className={styles.listInfo}>
                    <strong>Status: </strong>
                    {dataItem.status}
                  </p>
                ) : (
                  <></>
                )}
                {"previousSeason" in dataItem ? (
                  <p className={styles.listInfo}>
                    <strong>Temporada anterior: </strong>
                    {dataItem.previousSeason}
                  </p>
                ) : (
                  <></>
                )}
                {"nextSeason" in dataItem ? (
                  <p className={styles.listInfo}>
                    <strong>Próxima Temporada: </strong>
                    {dataItem.nextSeason}
                  </p>
                ) : (
                  <></>
                )}
                {"watched" in dataItem ? (
                  <p className={styles.listInfo}>
                    <strong>Visto: </strong>
                    {dataItem.watched}
                  </p>
                ) : (
                  <></>
                )}

                {"duration" in dataItem ? (
                  <p className={styles.listInfo}>
                    <strong>Duração: </strong>
                    {dataItem.duration}
                  </p>
                ) : (
                  <></>
                )}
                {"visa" in dataItem ? (
                  <p className={styles.listInfo}>
                    <strong>Visto: </strong>
                    {dataItem.visa ? "Sim" : "Não"}
                  </p>
                ) : (
                  <></>
                )}
                <p className={styles.listInfo}>
                  <strong>Sinops: </strong>
                  {dataItem.synopsis}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.containerGenres}>
            <Divider className={styles.genresLine} />
            <h2 className={styles.title}>Generos</h2>
            <div className={styles.genresItens}>{returnItemsOfTheGenre()}</div>
            <button
              className={styles.button}
              onClick={(e) => {
                setOpenModalAddGenre(true);
              }}
            >
              Adicionar novo
            </button>
          </div>
        </div>
      </div>
      <AdmPopUpDeleteItem
        onClosed={onClosedPopUpDelete}
        open={openPopUpDelete}
        typeIten={typeIten}
        infoItem={{ id: dataItem.id || "", name: dataItem.name }}
      />
    </>
  );

  function onClosedPopUpDelete(backToThePreviousPage: boolean) {
    if (backToThePreviousPage === true) {
      if (typeIten === "anime") {
        router.push(`/admin/listing/allAnime`);
      } else {
        router.push(`/admin/listing/allFilms`);
      }
    }
    setOpenPopUpDelete(false);
  }

  function handleInformationChangeEvent(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    //Redirecionando o usuario para a pagina de edição correspondente
    if (typeIten === "anime") {
      router.push(`/admin/anime/editing?id=${dataItem.id}`);
    } else {
      router.push(`/admin/films/editing?id=${dataItem.id}`);
    }
  }

  function closedPopUpAddGender() {
    setOpenModalAddGenre(!openModalAddGenre);
    location.reload();
  }

  function closedPopUpDeleteGender() {
    setOpenModalDeleteGenre(!openModalDeleteGenre);
    location.reload();
  }

  function returnItemsOfTheGenre() {
    if (dataItem.genres && dataItem.genres.length > 0) {
      return dataItem.genres.map((item, index) => (
        <div
          className={styles.iten}
          key={index}
          onClick={() => {
            setOpenModalDeleteGenre(true);
            setSelectedGenre(item);
          }}
        >
          {item}
        </div>
      ));
    } else {
      return (
        <p className={styles.message}>
          Opss: parece que esse {typeIten == "anime" ? "anime" : "filme"} não
          possui nenhum genero cadastrado
        </p>
      );
    }
  }
}
