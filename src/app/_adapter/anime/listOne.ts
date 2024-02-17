"use server";

import { IEntitieAnime } from "@/app/_interface/returnFromApi";

export default async function adapterListOneAnime(
  idAnime: string
): Promise<IEntitieAnime | undefined> {
  const url = process.env.URL_API_BASE + `/animes/${idAnime}`;
  const result = await fetch(url, { cache: "no-store" });

  if (result.status !== 200) {
    return undefined;
  }

  const dataResult = await result.json();
  return dataResult;
}
