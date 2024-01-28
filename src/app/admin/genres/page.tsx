"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";
import styles from "./index.module.scss";
import adapterListAllGenres from "@/app/_adapter/genres/listAll";
import { IGenre } from "@/app/_interface/dataBd";
import GenreItem from "./item";
import AdmPopUpRegisterGenre from "@/app/_components/adm/popUp/registerGenre";

import { checkingAdministratorJwtCredentials } from "@/app/_utils/tolken";

export default function PageGenres() {
  const [dataGenres, setDataGenres] = useState<IGenre[]>();
  const [openPopUpRegister, setOpenPopUpRegister] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    searchingAllRegisteredGenres();

    //Validando token jwt
    if (!checkingAdministratorJwtCredentials()) {
      router.push("/authentication/login");
    }
  }, [router]);

  return (
    <>
      <div className={styles.containerGenres}>
        <div className={styles.genresHeader}>
          <div className={styles.genresHeaderContainerTitle}>
            <h2 className={styles.genresHeaderTitle}>Generos Disponiveis</h2>
            <Divider style={{ background: "#7BC0FF" }} />
          </div>
          <div className={styles.genresHeaderContainerButton}>
            <button
              className={styles.genresHeaderButton}
              onClick={() => {
                setOpenPopUpRegister(true);
              }}
            >
              Novo
            </button>
          </div>
        </div>
        {dataGenres ? (
          <div className={styles.listGenres}>
            {dataGenres.map((iten, index) => {
              return <GenreItem dataComponent={iten} key={index} />;
            })}
          </div>
        ) : (
          <div className={styles.containerMessage}>
            <h2 className={styles.messageText}>
              Nenhum registro foi encontrado!!
            </h2>
          </div>
        )}
      </div>
      <AdmPopUpRegisterGenre
        open={openPopUpRegister}
        onClosed={closeRegistrationPopUp}
      />
    </>
  );

  function closeRegistrationPopUp() {
    setOpenPopUpRegister(false);
  }

  async function searchingAllRegisteredGenres() {
    const resultRequest = await adapterListAllGenres();

    if (resultRequest) {
      setDataGenres(resultRequest);
    }
  }
}
