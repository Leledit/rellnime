"use client";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import styles from "./page.module.scss";
import { adapterAdmDashboard } from "../_adapter/adm/dashboard";
import {
  IEntitieAnime,
  IEntitieFilme,
  IItemListing,
} from "../_interface/returnFromApi";
import ItemList from "../_components/general/itemList";
import { checkingAdministratorJwtCredentials } from "../_utils/tolken";
import { useRouter } from "next/navigation";
import LoadingComponent from "../_components/general/loading";

export default function PageAdmin() {
  const [dataDashboard, setDataDashboard] = useState<IItemListing[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    if (!checkingAdministratorJwtCredentials()) {
      router.push("/authentication/login");
    }

    const fetchData = async () => {
      try {
        const resutlData: IItemListing[] | undefined =
          await adapterAdmDashboard();
        if (resutlData) {
          setDataDashboard(resutlData);
        }
        setLoading(false);
      } catch (error) {
        console.log("Problemas ao buscar os dados " + error);
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className={styles.cotainerAdm}>
      <div className={styles.admHeader}>
        <h2 className={styles.admHeaderTitle}>Últimos registros</h2>
        <Divider style={{ background: "#7BC0FF" }} />
      </div>

      {!loading ? (
        dataDashboard ? (
          <div className={styles.admData}>
            {dataDashboard.map((item, index) => {
              return (
                <ItemList
                  key={index}
                  id={item.id}
                  img={item.urlImg}
                  name={item.name}
                  applicationSegment="ADM"
                  isAnime={!("duration" in item) ? true : false}
                />
              );
            })}
          </div>
        ) : (
          <>
            <div className={styles.containerMessage}>
              <h2 className={styles.messageText}>
                Nenhum registro foi encontrado!!
              </h2>
            </div>
          </>
        )
      ) : (
        <div className={styles.containerLoading}>
          <LoadingComponent height={80} width={80} loading={loading} />
        </div>
      )}
    </div>
  );
}
