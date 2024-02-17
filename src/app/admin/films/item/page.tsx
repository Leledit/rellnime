"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import adapterListOneFilme from "@/app/_adapter/films/listOne";
import AdmItem from "@/app/_components/adm/item";
import { IEntitieFilme, IItemListing } from "@/app/_interface/returnFromApi";
import { checkingAdministratorJwtCredentials } from "@/app/_utils/tolken";
import Loading from "@/app/loading";

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
    //Validando token jwt
    if (!checkingAdministratorJwtCredentials()) {
      router.push("/authentication/login");
    }
    //Buscando os dados de um filme
    lookingForInformationAboutAnFilme();

    async function lookingForInformationAboutAnFilme() {
      const dataFilme:IEntitieFilme | undefined = await adapterListOneFilme(idFilme as string);

      if (dataFilme) {
        setDataFilme(dataFilme);
      }
      setLoadingData(false);
    }
  }, [idFilme, router]);

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
      return <></>;
    }
  }
}
