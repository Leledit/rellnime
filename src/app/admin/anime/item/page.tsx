"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdmItem from "@/app/_components/adm/item";
import { IEntitieAnime } from "@/app/_interface/dataBd";
import adapterListOneAnime from "@/app/_adapter/anime/listOne";
import Loading from "@/app/loading";
import { checkingAdministratorJwtCredentials } from "@/app/_utils/tolken";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function AnimeItem({ searchParams }: IProps) {
  const router = useRouter();
  const idAnime = searchParams ? searchParams.id : undefined;

  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [dataAnime, setDataAnime] = useState<IEntitieAnime>();

  useEffect(() => {
    if (!idAnime) {
      router.push("/admin");
    }
    //Validando token jwt
    if (!checkingAdministratorJwtCredentials()) {
      router.push("/authentication/login");
    }
    //Buscando os dados de um anime
    lookingForInformationAboutAnAnime();

    async function lookingForInformationAboutAnAnime() {
      try {
        setLoadingData(true);

        const dataAnime = await adapterListOneAnime(idAnime as string);

        if (dataAnime) {
          setDataAnime(dataAnime);
        }
      } catch (error) {
        console.error("Erro ao procurar informações sobre o anime:", error);
      } finally {
        setLoadingData(false);
      }
    }
  }, [idAnime, router]);

  if (loadingData) {
    return <Loading />;
  } else {
    if (dataAnime) {
      return (
        <>
          <AdmItem typeIten="anime" dataItem={dataAnime} />
        </>
      );
    } else {
      return <></>;
    }
  }
}
