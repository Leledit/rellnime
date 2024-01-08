'use server'
export default async function adapterListOneAnime(idAnime:string){
    const url = process.env.URL_API_BASE + `/animes/${idAnime}`;

    const result = await fetch(url); 

    if(result.status !== 200){
        return undefined
    }

    const dataResult = await result.json();
    return dataResult;

}