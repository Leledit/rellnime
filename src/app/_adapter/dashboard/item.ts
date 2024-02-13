"use server";
export default async function adapterDashboarItem(idItem:string) {
  const url = process.env.URL_API_BASE + `/dashboard/item/?id=${idItem}`;

  const result = await fetch(url, { cache: "no-store" });

  if (result.status !== 200) {
    return undefined;
  }

  const dataResult = await result.json();
  return dataResult;
}
