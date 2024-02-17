"use server";

import { IDataGenre } from "@/app/_interface/returnFromApi";

export default async function adapterQueryGenres(
  query: string
): Promise<IDataGenre[] | undefined> {
  const url = process.env.URL_API_BASE + `/genres/search?query=${query}`;

  const result = await fetch(url, { cache: "no-store" });

  if (result.status !== 200) {
    return undefined;
  }

  const dataResult = await result.json();
  return dataResult;
}
