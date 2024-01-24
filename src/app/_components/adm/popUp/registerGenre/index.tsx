"use client";
import { ImensagemRequest } from "@/app/_interface/forms";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { FormEvent, MouseEvent, useState } from "react";
import styled from "styled-components";
import styles from "./index.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import FormLoading from "@/app/_components/general/form/loading";
import FormMessage from "@/app/_components/general/form/message";
import adapterGenresRegister from "@/app/_adapter/genres/register";
import { getTolkenCookie } from "@/app/_utils/cookies/cookies";

interface IProps {
  open: boolean;
  onClosed: () => void;
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "700px",
  },
}));

export default function AdmPopUpRegisterGenre({ open, onClosed }: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [fildGenre, setFildGenre] = useState<string>("");
  const [mensagemRequest, setMensagemRequest] = useState<ImensagemRequest>({
    message: "",
    status: 0,
  });

  const accessToken = getTolkenCookie();

  return (
    <>
      <CustomDialog open={open}>
        <DialogTitle className={styles.dialogTitle}>
          Cadastrar genero
        </DialogTitle>
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
          <form className={styles.containerForm}>
            <label className={styles.formLabel}>Nome :</label>
            <div
              className={styles.containerAlign}
              style={{ marginBottom: "50px" }}
            >
              <input
                type="search"
                className={styles.input}
                name="search"
                onChange={(e) => {
                  setFildGenre(e.target.value);
                }}
                value={fildGenre}
              />
            </div>
            <FormLoading loading={loading} />
            <FormMessage mensagemRequest={mensagemRequest} />
          </form>
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
          <button
            className={styles.button}
            onClick={(e) => {
              registerANewGenreInTheDatabase(e);
            }}
          >
            Cadastrar
          </button>
        </DialogActions>
      </CustomDialog>
    </>
  );
  async function registerANewGenreInTheDatabase(e: MouseEvent<HTMLButtonElement>) {
    if (fildGenre.length !== 0 && fildGenre !== "") {
      setLoading(true);
      setMensagemRequest({ message: "", status: 0 });
      
      const resultRequest = await adapterGenresRegister(fildGenre,accessToken);

      if(resultRequest === 409){
        setMensagemRequest({
          status: 500,
          message: "Ja existe outro genero com esse nome cadastrado!",
        });
      }else if(resultRequest === 500){
        setMensagemRequest({
          status: 500,
          message: "Problemas ao realizar o cadastro do genero",
        });
      }else{
        setMensagemRequest({
          status: 200,
          message: resultRequest.details,
        });
        setFildGenre('');
      }

      setLoading(false);
    } else {
      setMensagemRequest({
        status: 500,
        message: "Campo nome não pode estar vazio",
      });
    }
  }
}
