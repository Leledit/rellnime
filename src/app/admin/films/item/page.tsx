"use client";
import adapterListOneFilme from "@/app/_adapter/films/listOne";
import AdmItem from "@/app/_components/adm/item";
import { IEntitieFilme } from "@/app/_interface/dataBd";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function FilmsItem({ searchParams }: IProps) {
  const router = useRouter();
  const idFilme = searchParams ? searchParams.id : undefined;

  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [dataFilme, setDataFilme] = useState<IEntitieFilme>();

  useEffect(() => {
    if (!idFilme) {
      router.push("/admin");
    }
    //Buscando os dados de um filme
    lookingForInformationAboutAnFilme();
  }, []);

  const lookingForInformationAboutAnFilme = async () => {
    const dataFilme = await adapterListOneFilme(idFilme as string);

    if (dataFilme) {
      setDataFilme(dataFilme);
    }
    setLoadingData(false);
  };

  if (loadingData) {
    return <Loading />;
  } else {
    if (dataFilme) {
      return (
        <>
          <AdmItem typeIten="filme" dataItem={dataFilme} />
        </>
      );
    } else {
      return <>Deu ruin</>;
    }
  }
}
