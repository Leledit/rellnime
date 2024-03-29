"use server";

import { IMessageReturn } from "@/app/_interface/returnFromApi";
import { put } from "../http.service";

interface dataAnime {
  name: string;
  watched: boolean;
  qtdEpisodes: number;
  releaseYear: number;
  note: number;
  status: string;
  nextSeason: string;
  previousSeason: string;
  synopsis: string;
  img: any;
}

export default async function adapterAnimeChanging(
  dataAnime: dataAnime,
  accessToken: string,
  idAnime: string
): Promise<IMessageReturn | undefined> {
  const url = process.env.URL_API_BASE + `/animes/${idAnime}`;

  const result = await put(
    url,
    {
      name: dataAnime.name,
      watched: dataAnime.watched,
      qtdEpisodes: dataAnime.qtdEpisodes,
      releaseYear: dataAnime.releaseYear,
      note: dataAnime.note,
      status: dataAnime.status,
      nextSeason: dataAnime.nextSeason,
      previousSeason: dataAnime.previousSeason,
      synopsis: dataAnime.synopsis,
      img: dataAnime.img,
    },
    accessToken
  );

  if (result) {
    const resutlData = await result.json();

    return resutlData;
  } else {
    return undefined;
  }
}
