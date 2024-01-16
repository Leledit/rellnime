'use server'
export default async function adapterQueryGenres(query:string){
    const url = process.env.URL_API_BASE + `/genres/search?query=${query}`;

    const result = await fetch(url); 

    if(result.status !== 200){
        return undefined
    }

    const dataResult = await result.json();
    return dataResult;
}