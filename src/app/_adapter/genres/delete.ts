"use server";

import { delet } from "../http.service";

export default async function AdapterGenresDelete(
  idGenre: string,
  tolken: string
) {
  const url = process.env.URL_API_BASE + `/genres/${idGenre}`;

  const result = await delet(url, tolken);

  if (result.status !== 200) {
    return result.status;
  }

  const resutlData = await result.json();

  return resutlData;
}
