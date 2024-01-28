"use client";
import { MouseEvent, useState } from "react";
import styled from "styled-components";
import styles from "./index.module.scss";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ImensagemRequest } from "@/app/_interface/forms";
import AdapterAnimeDelete from "@/app/_adapter/anime/delete";
import { getTolkenCookie } from "@/app/_utils/cookies/cookies";
import AdapterFilmsDelete from "@/app/_adapter/films/delete";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "700px",
  },
}));

type typeItem = "anime" | "filme";

interface IProps {
  open: boolean;
  onClosed: (reloadComponents: boolean, typeIten: typeItem) => void;
  typeIten: typeItem;
  infoItem: {
    name: string;
    id: string;
  };
}

export default function AdmPopUpDeleteItem({
  open,
  onClosed,
  typeIten,
  infoItem,
}: IProps) {
  const [mensagemRequest, setMensagemRequest] = useState<ImensagemRequest>({
    message: "",
    status: 0,
  });

  return (
    <>
      <CustomDialog open={open}>
        <DialogTitle className={styles.dialogTitle}>
          {returnTitleMessagePopUp(typeIten)}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            onClosed(false, typeIten);
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
          <div className={styles.containerInfos}>
            <p className={styles.title}>
              {mensagemRequest.status === 0 ? (
                returnTitleMessage(typeIten, infoItem.name)
              ) : (
                <>{mensagemRequest.message}</>
              )}
            </p>
            <div className={styles.containerButtons}>
              <button
                onClick={() => {
                  onClosed(true, typeIten);
                }}
                className={styles.button}
              >
                Fechar
              </button>
              {mensagemRequest.status !== 200 ? (
                <>
                  <button
                    className={styles.button}
                    onClick={(e) => {
                      handleGenderRemoveEvent(e, typeIten, infoItem.id);
                    }}
                  >
                    Remover
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </DialogContent>
      </CustomDialog>
    </>
  );

  async function handleGenderRemoveEvent(
    e: MouseEvent<HTMLButtonElement>,
    typeIten: string,
    idItem: string
  ) {
    e.preventDefault();
    if (typeIten === "anime") {
      const resultDeleteAnime = await AdapterAnimeDelete(
        idItem,
        getTolkenCookie()
      );

      if (resultDeleteAnime === 500) {
        setMensagemRequest({
          status: 500,
          message: "Problemas ao excluir o anime.",
        });
      } else {
        setMensagemRequest({ status: 200, message: resultDeleteAnime.details });
      }
    } else {
      const resultDeleteFilm = await AdapterFilmsDelete(
        idItem,
        getTolkenCookie()
      );
      if (resultDeleteFilm === 500) {
        setMensagemRequest({
          status: 500,
          message: "Problemas ao excluir o Filme.",
        });
      } else {
        setMensagemRequest({ status: 200, message: resultDeleteFilm.details });
      }
    }
  }

  function returnTitleMessage(typeIten: typeItem, nameItem: string) {
    const routeMapping: Record<typeItem, string> = {
      anime: `Deseja realmente excluir o anime: "${nameItem}" `,
      filme: `Deseja realmente excluir o filme: "${nameItem}" `,
    };

    return routeMapping[typeIten];
  }

  function returnTitleMessagePopUp(typeItem: String) {
    const routeMapping: Record<typeItem, string> = {
      anime: `Exclusão de anime`,
      filme: `Exclusão de filme`,
    };
    return routeMapping[typeIten];
  }
}
