"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import { IGenre } from "@/app/_interface/returnFromApi";
import AdmPopUpAvailableShares from "@/app/_components/adm/popUp/availableSharesGenre";
import { checkingAdministratorJwtCredentials } from "@/app/_utils/tolken";

interface IProps {
  dataComponent: IGenre;
}

export default function GenreItem({ dataComponent }: IProps) {
  const [openPopUpOps, setOpenPopUpOps] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    //Validando token jwt
    if (!checkingAdministratorJwtCredentials()) {
      router.push("/authentication/login");
    }
  });

  return (
    <>
      <AdmPopUpAvailableShares
        genre={dataComponent}
        onClosed={closePopIpOfAvailableOptions}
        open={openPopUpOps}
      />
      <div
        className={styles.containerItem}
        onClick={() => {
          setOpenPopUpOps(true);
        }}
      >
        {dataComponent.name}
      </div>
    </>
  );

  function closePopIpOfAvailableOptions(reloadComponents: boolean) {
    if (reloadComponents === true) {
      window.location.reload();
    }
    setOpenPopUpOps(false);
  }
}
