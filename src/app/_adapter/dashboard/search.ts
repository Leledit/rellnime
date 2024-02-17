"use server";

import { IDataPagination } from "@/app/_interface/returnFromApi";

export default async function AdapterDashboarSearch(
  search: string,
  page: number,
  limit: number
): Promise<IDataPagination | undefined> {
  const url =
    process.env.URL_API_BASE +
    `/dashboard/search/?search=${search}&page=${page}&limit=${limit}`;

  const result = await fetch(url, { cache: "no-store" });

  if (result.status !== 200) {
    return undefined;
  }

  if (result) {
    const totalRecords: number = parseInt(
      result.headers.get("X-Total-Count") as string
    );

    const dataResult = await result.json();

    return {
      result: dataResult,
      totalRecords: totalRecords,
    };
  } else {
    return undefined;
  }
}
