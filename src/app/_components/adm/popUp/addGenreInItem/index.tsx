"use client";
import { FormEvent, MouseEvent, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./index.module.scss";
import { IDataGenre, IGenre } from "@/app/_interface/returnFromApi";
import { ImensagemRequest } from "@/app/_interface/forms";
import FormLoading from "@/app/_components/general/form/loading";
import FormMessage from "@/app/_components/general/form/message";
import adapterQueryGenres from "@/app/_adapter/genres/query";
import { adapterAnimeAddGenre } from "@/app/_adapter/anime/genre";
import { getTolkenCookie } from "@/app/_utils/cookies/cookies";
import { adapterFilmeAddGenre } from "@/app/_adapter/films/genre";
import { IMessageReturn } from "@/app/_interface/returnFromApi";

interface IProps {
  open: boolean;
  onClosed: (backToThePreviousPage: boolean) => void;
  typeIten: string;
  idItem: string | undefined;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "700px",
  },
}));

export default function AdmPopUpAddGenre({
  open,
  onClosed,
  typeIten,
  idItem,
}: IProps) {
  const [resultQuery, setResultQuery] = useState<IDataGenre[]>([]);
  const [fieldQuery, setFieldQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGenre, setSelectedGenre] = useState<IGenre>();
  const [mensagemRequest, setMensagemRequest] = useState<ImensagemRequest>({
    message: "",
    status: 0,
  });

  return (
    <>
      <CustomDialog open={open}>
        <DialogTitle className={styles.dialogTitle}>
          Adicionar genero
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            if (mensagemRequest.status === 200) {
              onClosed(true);
            } else {
              onClosed(false);
            }
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form
            className={styles.containerForm}
            onSubmit={(e) => {
              handlingGenreSearchEvent(e);
            }}
          >
            <label className={styles.formLabel}>Pesquisar :</label>
            <div
              className={styles.containerAlign}
              style={{ marginBottom: resultQuery.length !== 0 ? "" : "50px" }}
            >
              <input
                type="search"
                className={styles.input}
                name="search"
                onChange={(e) => {
                  setFieldQuery(e.target.value);
                }}
                value={fieldQuery}
              />
              <button type="submit" className={styles.button} />
            </div>
            {resultQuery.length > 0 ? (
              <div className={styles.containerResult}>
                <h2 className={styles.resultTitle}>Resultados da busca</h2>
                <div className={styles.resultItens}>
                  {resultQuery.map((iten, index) => {
                    return (
                      <p
                        className={
                          iten.selected
                            ? `${styles.resultIten} ${styles.resultItenSelected}`
                            : styles.resultIten
                        }
                        key={index}
                        onClick={() => {
                          selectAnAvailableGenre(iten);
                        }}
                      >
                        {iten.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}

            <FormLoading loading={loading} />
            <FormMessage mensagemRequest={mensagemRequest} />
          </form>
        </DialogContent>
        <DialogActions className={styles.containerButtons}>
          <button
            onClick={() => {
              if (mensagemRequest.status === 200) {
                onClosed(true);
              } else {
                onClosed(false);
              }
            }}
            className={styles.button}
          >
            Fechar
          </button>
          <button
            className={styles.button}
            onClick={(e) => {
              handleAddGenderEvent(e);
            }}
          >
            Adicionar
          </button>
        </DialogActions>
      </CustomDialog>
    </>
  );

  async function handlingGenreSearchEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (fieldQuery !== "") {
      //limpando o campo de mensagem
      setMensagemRequest({
        message: "",
        status: 0,
      });
      //Realizando a pesquisa dos generos no banco de dados
      const resultRequest: IDataGenre[] | undefined = await adapterQueryGenres(
        fieldQuery
      );

      if (resultRequest) {
        let genres: IDataGenre[] = [];
        resultRequest.map((item: IGenre) => {
          genres.push({
            id: item.id,
            registrationDate: item.registrationDate,
            name: item.name,
            selected: false,
          });
        });
        //Adicionando os generos encontrados no estado
        setResultQuery(genres);
        //Limpando o campo de pesquisa
        setFieldQuery("");
      } else {
        setMensagemRequest({
          message: "Nenhum registro foi encontrado!",
          status: 500,
        });
      }
    } else {
      setMensagemRequest({
        message: "O campo pesquisa não pode estar vazio!",
        status: 500,
      });
      setResultQuery([]);
    }

    setLoading(false);
  }

  function selectAnAvailableGenre(genre: IGenre) {
    setResultQuery((prevResuts) => {
      const updateResults = prevResuts.map((iten) =>
        iten.id === genre.id
          ? { ...iten, selected: true }
          : { ...iten, selected: false }
      );

      return updateResults;
    });
    setSelectedGenre(genre);
  }

  async function handleAddGenderEvent(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (idItem && selectedGenre?.name) {
      let resultRequest: IMessageReturn | undefined;
      if (typeIten === "anime") {
        resultRequest = await adapterAnimeAddGenre(
          idItem,
          selectedGenre?.name,
          getTolkenCookie()
        );
      } else {
        resultRequest = await adapterFilmeAddGenre(
          idItem,
          selectedGenre?.name,
          getTolkenCookie()
        );
      }
      if (!resultRequest) {
        setMensagemRequest({
          status: 500,
          message: `Problemas ao adicionar o genero ao ${typeIten}`,
        });
      } else if (resultRequest.message) {
        setMensagemRequest({
          status: 200,
          message: resultRequest.message,
        });
        setResultQuery([]);
        setFieldQuery("");
        setSelectedGenre(undefined);
      } else {
        setMensagemRequest({ message: resultRequest.details, status: 500 });
      }
    } else {
      setMensagemRequest({
        status: 500,
        message: `Nenhum genero selecionado! por favor selecione um genero`,
      });
    }
  }
}
