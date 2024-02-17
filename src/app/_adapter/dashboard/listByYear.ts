"use server";

import { IDataPagination } from "@/app/_interface/returnFromApi";

export default async function AdapterDashboarListByYear(
  page: number,
  limit: number,
  year: number
): Promise<IDataPagination | undefined> {
  const url =
    process.env.URL_API_BASE +
    `/dashboard/year/?page=${page}&limit=${limit}&year=${year}`;

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
