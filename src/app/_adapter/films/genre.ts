"use server";

import { IMessageReturn } from "@/app/_interface/returnFromApi";
import { delet, post } from "../http.service";

export async function adapterFilmeAddGenre(
  idFilme: string,
  nameGenre: string,
  tolken: string
): Promise<IMessageReturn | undefined> {
  const url = process.env.URL_API_BASE + "/filmes/genres/add";

  const result = await post(
    url,
    {
      id: idFilme,
      nameGenre: nameGenre,
    },
    tolken
  );

  if (result) {
    const resutlData = await result.json();

    return resutlData;
  } else {
    return undefined;
  }
}

export async function adapterFilmeDeleteGenre(
  idAnime: string,
  nameGenre: string,
  tolken: string
): Promise<IMessageReturn | undefined> {
  const url =
    process.env.URL_API_BASE +
    `/filmes/genres/delete?id=${idAnime}&nameGenre=${nameGenre}`;

  const result = await delet(url, tolken);

  if (result) {
    const resutlData = await result.json();

    return resutlData;
  } else {
    return undefined;
  }
}
