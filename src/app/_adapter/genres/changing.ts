"use server";

import { put } from "../http.service";

interface IDataGenre {
  name: string;
  id: string;
}

export default async function adapterGenresChanging(
  dataGenres: IDataGenre,
  accessToken: string
) {
  const url = process.env.URL_API_BASE + `/genres/${dataGenres.id}`;

  const result = await put(url, { name: dataGenres.name }, accessToken);

  if (result.status !== 200) {
    return result.status;
  }

  const resutlData = await result.json();

  return resutlData;
}
