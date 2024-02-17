"use server";

import { IItemListing } from "@/app/_interface/returnFromApi";

export default async function adapterListAllFilmes(): Promise<
  IItemListing[] | undefined
> {
  const url = process.env.URL_API_BASE + "/filmes/";

  const result = await fetch(url, { cache: "no-store" });

  if (result.status !== 200) {
    return undefined;
  }

  const dataResult = await result.json();
  return dataResult;
}
