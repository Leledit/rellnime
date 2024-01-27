"use server";

import { delet } from "../http.service";

export default async function AdapterAnimeDelete(
  idAnime: string,
  tolken: string
) {
  const url = process.env.URL_API_BASE + `/animes/${idAnime}`;

  const result = await delet(url, tolken);

  if (result.status !== 200) {
    return result.status;
  }

  const resutlData = await result.json();

  return resutlData;
}
