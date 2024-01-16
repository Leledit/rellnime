"use server";

import { delet, post } from "../http.service";

export async function adapterFilmeAddGenre(idFilme: string, nameGenre: string,tolken:string) {
  const url = process.env.URL_API_BASE + "/filmes/genres/add";

  const result = await post(url, {
    id: idFilme,
    nameGenre: nameGenre,
  },tolken);

  if (result.status !== 201) {
    return result.status;
  }

  const resutlData = await result.json();

  return resutlData;
}

export async function adapterFilmeDeleteGenre(idAnime: string, nameGenre: string,tolken:string) {
  const url = process.env.URL_API_BASE + "/filmes/genres/delete";

  const result = await delet(url, {
    id: idAnime,
    nameGenre: nameGenre,
  },tolken);

  if (result.status !== 200) {
    return result.status;
  }

  const resutlData = await result.json();

  return resutlData;
}
