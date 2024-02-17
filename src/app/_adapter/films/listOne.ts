"use server";

import { IEntitieFilme, IItemListing } from "@/app/_interface/returnFromApi";

export default async function adapterListOneFilme(
  idFilme: string
): Promise<IEntitieFilme | undefined> {
  const url = process.env.URL_API_BASE + `/filmes/${idFilme}`;

  const result = await fetch(url, { cache: "no-store" });

  if (result.status !== 200) {
    return undefined;
  }

  if (result) {
    const dataResult = await result.json();
    return dataResult;
  } else {
    return undefined;
  }
}
