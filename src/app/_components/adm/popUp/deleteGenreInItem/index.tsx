"use client";
import { MouseEvent, useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import styles from "./index.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { getTolkenCookie } from "@/app/_utils/cookies/cookies";
import { ImensagemRequest } from "@/app/_interface/forms";
import { adapterAnimeDeleteGenre } from "@/app/_adapter/anime/genre";
import { adapterFilmeDeleteGenre } from "@/app/_adapter/films/genre";
import FormLoading from "@/app/_components/general/form/loading";
import FormMessage from "@/app/_components/general/form/message";

interface props {
  open: boolean;
  onClosed: () => void;
  typeIten: string;
  nameItem: string;
  nameGenre: string;
  idItem: string | undefined;
}

export default function AdmPopUpDeleteGenre({
  open,
  onClosed,
  typeIten,
  nameItem,
  nameGenre,
  idItem,
}: props) {
  const CustomDialog = styled(Dialog)(({ theme }) => ({
    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
      width: "700px",
    },
  }));

  const [loading, setLoading] = useState<boolean>(false);
  const [mensagemRequest, setMensagemRequest] = useState<ImensagemRequest>({
    message: "",
    status: 0,
  });
  const refButtonDelete = useRef<HTMLButtonElement>(null);

  return (
    <>
      <CustomDialog open={open}>
        <DialogTitle className={styles.dialogTitle}>Remover genero</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            onClosed();
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
          <p className={styles.textMensagem}>
            Deseja reamente excluir o genero{" "}
            <strong>&apos;{nameGenre}&apos;</strong> vinculado ao item{" "}
            <strong>&apos;{nameItem}&apos;</strong>
          </p>
          <FormLoading loading={loading} />
          <FormMessage mensagemRequest={mensagemRequest} />
        </DialogContent>
        <DialogActions className={styles.containerButtons}>
          <button
            onClick={() => {
              onClosed();
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
                  handleGenderRemoveEvent(e);
                }}
                ref={refButtonDelete}
              >
                Remover
              </button>
            </>
          ) : (
            <></>
          )}
        </DialogActions>
      </CustomDialog>
    </>
  );

  async function handleGenderRemoveEvent(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);

    if (idItem && nameGenre) {
      let resultRequest;
      if (typeIten === "anime") {
        resultRequest = await adapterAnimeDeleteGenre(
          idItem,
          nameGenre,
          getTolkenCookie()
        );
      } else {
        resultRequest = await adapterFilmeDeleteGenre(
          idItem,
          nameGenre,
          getTolkenCookie()
        );
      }
      
      if (resultRequest === 500) {
        setMensagemRequest({
          status: 500,
          message: `Problemas ao remover o genero ao ${typeIten}!`,
        });
      } else {
        setMensagemRequest({
          status: 200,
          message: resultRequest.message,
        });
      }
    } else {
      setMensagemRequest({
        status: 500,
        message: `Problemas ao remover o genero ao ${typeIten}!`,
      });
    }
    setLoading(false);
  }
}
