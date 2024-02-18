"use client";
import { useState } from "react";
import styled from "styled-components";
import styles from "./index.module.scss";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ImensagemRequest } from "@/app/_interface/forms";
import { IMessageReturn } from "@/app/_interface/returnFromApi";
import AdapterUserDelete from "@/app/_adapter/user/delete";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "700px",
  },
}));

interface IProps {
  open: boolean;
  onClosed: (logOutUser: boolean) => void;
  idUser: string;
}

export default function UserPopUpDeleteAccount({
  open,
  onClosed,
  idUser,
}: IProps) {
  const [mensagemRequest, setMensagemRequest] = useState<ImensagemRequest>({
    message: "",
    status: 0,
  });

  return (
    <>
      <CustomDialog open={open}>
        <DialogTitle className={styles.dialogTitle}>
          Exclusão de conta
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
          <div className={styles.containerInfos}>
            <p className={styles.title}>
              {mensagemRequest.status === 0 ? (
                "Deseja realmente excluir sua conta?"
              ) : (
                <>{mensagemRequest.message}</>
              )}
            </p>
            <div className={styles.containerButtons}>
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
                {mensagemRequest.status === 200 ? "Voltar" : "Não"}
              </button>
              {mensagemRequest.status !== 200 ? (
                <>
                  <button
                    className={styles.button}
                    onClick={(e) => {
                      dealingWithAccountDeletion(idUser);
                    }}
                  >
                    Sim
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

  async function dealingWithAccountDeletion(id: string) {
    try {
      const resultRequest: IMessageReturn | undefined = await AdapterUserDelete(
        id
      );

      if (!resultRequest) {
        setMensagemRequest({
          status: 500,
          message: `Problemas ao excluir sua conta`,
        });
      } else {
        if (resultRequest.message) {
          setMensagemRequest({
            status: 200,
            message: resultRequest.message,
          });
        } else {
          setMensagemRequest({
            status: 500,
            message: resultRequest.details,
          });
        }
      }
    } catch (error) {
      console.log("Problemas ao buscar os dados " + error);
    }
  }
}
