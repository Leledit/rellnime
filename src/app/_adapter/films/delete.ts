"use server";

import { IMessageReturn } from "@/app/_interface/returnFromApi";
import { delet } from "../http.service";

export default async function AdapterFilmsDelete(
  idFilm: string,
  tolken: string
): Promise<IMessageReturn | undefined> {
  const url = process.env.URL_API_BASE + `/filmes/${idFilm}`;

  const result = await delet(url, tolken);

  if (result) {
    const resutlData = await result.json();

    return resutlData;
  } else {
    return undefined;
  }
}
