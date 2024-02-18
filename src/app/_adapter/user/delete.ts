"use server";

import { IMessageReturn } from "@/app/_interface/returnFromApi";
import { delet, get } from "../http.service";

export default async function AdapterUserDelete(
  id: string
): Promise<IMessageReturn | undefined> {
  const url = process.env.URL_API_BASE + `/user/${id}`;

  const result = await delet(url);

  if (result) {
    const resutlData = await result.json();

    return resutlData;
  } else {
    return undefined;
  }
}
