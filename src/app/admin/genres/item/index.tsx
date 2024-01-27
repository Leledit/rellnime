"use client";
import { IGenre } from "@/app/_interface/dataBd";
import styles from "./index.module.scss";
import { useState } from "react";
import AdmPopUpAvailableShares from "@/app/_components/adm/popUp/availableShares";

interface IProps {
  dataComponent: IGenre;
}

export default function GenreItem({ dataComponent }: IProps) {
  const [openPopUpOps, setOpenPopUpOps] = useState<boolean>(false);

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

  function closePopIpOfAvailableOptions(reloadComponents:boolean) {
    if(reloadComponents===true){
      window.location.reload();
    }
    setOpenPopUpOps(false);
  }
}
