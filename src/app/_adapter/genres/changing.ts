"use server";

import { IMessageReturn } from "@/app/_interface/returnFromApi";
import { put } from "../http.service";

interface IDataGenre {
  name: string;
  id: string;
}

export default async function adapterGenresChanging(
  dataGenres: IDataGenre,
  accessToken: string
): Promise<IMessageReturn | undefined> {
  const url = process.env.URL_API_BASE + `/genres/${dataGenres.id}`;

  const result = await put(url, { name: dataGenres.name }, accessToken);

  if (result) {
    const resutlData = await result.json();

    return resutlData;
  } else {
    return undefined;
  }
}
