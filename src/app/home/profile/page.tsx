"use client";
import { useEffect, useState } from "react";
import styles from "./inde.module.scss";
import AdapterUserList from "@/app/_adapter/user/list";
import {
  destroyTolkenCookie,
  getTolkenCookie,
} from "@/app/_utils/cookies/cookies";
import getUserTypeFromToken from "@/app/_utils/tolken";
import { IErrorRequest, IListUser } from "@/app/_interface/returnFromApi";
import LoadingComponent from "@/app/_components/general/loading";
import UserPopUpDeleteAccount from "@/app/_components/user/popUp/deleteAccount";

export default function ProfilePage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataUser, setDataUser] = useState<IListUser>();
  const [openPopUpDelete, setOpenPopUpDelete] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tolken = getTolkenCookie();
        const infoUser: any = getUserTypeFromToken(tolken);

        if (infoUser) {
          const resultRequest: IListUser | undefined | IErrorRequest =
            await AdapterUserList(infoUser.usuarioId);
          if (resultRequest) {
            if ("email" in resultRequest) {
              setDataUser(resultRequest);
            }
          }
          setLoading(false);
        }
      } catch (error) {
        console.log("Problemas ao buscar os dados " + error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.containerProfile}>
        {!loading ? (
          dataUser ? (
            <>
              <h2 className={styles.profileTitle}>Perfil</h2>
              <div className={styles.profileInfo}>
                <div className={styles.info}>
                  <p className={styles.infoLabel}>Nome:</p>
                  <p className={styles.infoValue}>{dataUser.name}</p>
                </div>
                <div className={styles.info}>
                  <p className={styles.infoLabel}>Email:</p>
                  <p className={styles.infoValue}>{dataUser.email}</p>
                </div>
                <div className={styles.info}>
                  <p className={styles.infoLabel}>Senha:</p>
                  <p className={styles.infoValue}>*********</p>
                </div>
              </div>
              <div className={styles.containerActions}>
                <button
                  className={styles.action}
                  onClick={() => {
                    setOpenPopUpDelete(true);
                  }}
                >
                  Excluir conta
                </button>
                <button className={styles.action}>Alterar senha</button>
              </div>
            </>
          ) : (
            <div className={styles.containerMensageError}>
              <h3 className={styles.mensageError}>
                Opss. aparentemente nenhum registro foi encontrado!
              </h3>
            </div>
          )
        ) : (
          <div className={styles.containerLoading}>
            <LoadingComponent height={80} width={80} loading={loading} />
          </div>
        )}
      </div>
      <UserPopUpDeleteAccount
        open={openPopUpDelete}
        idUser={dataUser?.id || ""}
        onClosed={onClosePopUpDelete}
      />
    </>
  );

  function onClosePopUpDelete(logOutUser: Boolean) {
    if (logOutUser) {
      destroyTolkenCookie();
      window.location.href = "/home/";
    } else {
      setOpenPopUpDelete(!openPopUpDelete);
    }
  }
}
