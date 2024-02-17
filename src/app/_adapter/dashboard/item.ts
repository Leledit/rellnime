"use server";

import { IDashboardItem } from "@/app/_interface/returnFromApi";

export default async function adapterDashboarItem(
  idItem: string
): Promise<IDashboardItem | undefined> {
  const url = process.env.URL_API_BASE + `/dashboard/item/?id=${idItem}`;

  const result = await fetch(url, { cache: "no-store" });

  if (result.status !== 200) {
    return undefined;
  }

  const dataResult = await result.json();
  return dataResult;
}
