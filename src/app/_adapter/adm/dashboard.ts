"use server";

import { IItemListing } from "@/app/_interface/returnFromApi";

export async function adapterAdmDashboard(): Promise<
  IItemListing[] | undefined
> {
  const url = process.env.URL_API_BASE + "/dashboard/recentylAdded/";

  const result = await fetch(url, { cache: "no-store" });

  if (result.status !== 200) {
    return undefined;
  }

  const dataResult = await result.json();
  return dataResult;
}
