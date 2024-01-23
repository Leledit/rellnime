"use server";

import { put } from "../http.service";

interface IDataFilm {
  name: string,
  visa:string,
  duration:string,
  note:string,
  synopsis:string,
  releaseYear:number,
  img:string,
}

export default async function adapterFilmsChanging(
  dataFilms: IDataFilm,
  accessToken: string,
  idFilm: string,
) {
  const url = process.env.URL_API_BASE + `/filmes/${idFilm}`;

  const result = await put(
    url,
    {
      name: dataFilms.name,
      visa: dataFilms.visa,
      duration: dataFilms.duration,
      note: dataFilms.note,
      synopsis: dataFilms.synopsis,
      releaseYear: dataFilms.releaseYear,
      img: dataFilms.img
    },
    accessToken
  );

  if (result.status !== 200) {
    return result.status;
  }

  const resutlData = await result.json();

  return resutlData;
}
