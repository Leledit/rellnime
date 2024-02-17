"use server";

import { IGenre, IItemListing } from "@/app/_interface/returnFromApi";

export default async function adapterListAllGenres(): Promise<
  IGenre[] | undefined
> {
  const url = process.env.URL_API_BASE + `/genres/`;

  const result = await fetch(url, { cache: "no-store" });

  if (result.status !== 200) {
    return undefined;
  }

  const dataResult = await result.json();
  return dataResult;
}
