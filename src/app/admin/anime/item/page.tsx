"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdmItem from "@/app/_components/adm/item";
import { IEntitieAnime } from "@/app/_interface/dataBd";
import adapterListOneAnime from "@/app/_adapter/anime/listOne";
import Loading from "@/app/loading";

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
    //Buscando os dados de um anime
    lookingForInformationAboutAnAnime();
  }, []);

  const lookingForInformationAboutAnAnime = async () => {
    const dataAnime = await adapterListOneAnime(idAnime as string);

    if (dataAnime) {
      setDataAnime(dataAnime);
    }
    setLoadingData(false);
  };

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
