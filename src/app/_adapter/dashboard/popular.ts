"use server";

import { IDashboardPopular, IItemListing } from "@/app/_interface/returnFromApi";

export default async function adapterPopular(
  limit: number
): Promise<IDashboardPopular[] | undefined> {
  const url = process.env.URL_API_BASE + `/dashboard/popular/?limit=${limit}`;

  const result = await fetch(url, { cache: "no-store" });

  if (result.status !== 200) {
    return undefined;
  }

  const dataResult = await result.json();
  return dataResult;
}
