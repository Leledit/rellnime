"use server";

import { delet } from "../http.service";

export default async function AdapterFilmsDelete(
  idFilm: string,
  tolken: string
) {
  const url = process.env.URL_API_BASE + `/filmes/${idFilm}`;

  const result = await delet(url, tolken);

  if (result.status !== 200) {
    return result.status;
  }

  const resutlData = await result.json();

  return resutlData;
}
