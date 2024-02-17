"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdmItem from "@/app/_components/adm/item";
import { IEntitieAnime } from "@/app/_interface/returnFromApi";
import adapterListOneAnime from "@/app/_adapter/anime/listOne";
import { checkingAdministratorJwtCredentials } from "@/app/_utils/tolken";
import LoadingComponent from "@/app/_components/general/loading";

interface IProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function AnimeItem({ searchParams }: IProps) {
  const router = useRouter();
  const idAnime = searchParams ? searchParams.id : undefined;

  const [loading, setLoading] = useState<boolean>(true);
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
        setLoading(true);

        const dataAnime = await adapterListOneAnime(idAnime as string);

        if (dataAnime) {
          setDataAnime(dataAnime);
        }
      } catch (error) {
        console.error("Erro ao procurar informações sobre o anime:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [idAnime, router]);

  if (loading) {
    return <LoadingComponent height={80} width={80} loading={loading} />;
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
