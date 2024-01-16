'use server'
export default async function adapterListOneAnime(idAnime:string){
    const url = process.env.URL_API_BASE + `/animes/${idAnime}`;
    const { signal } = new AbortController();
    const result = await fetch(url,{ cache:'no-store' }); 

    if(result.status !== 200){
        return undefined
    }

    const dataResult = await result.json();
    return dataResult;

}