'use server'

export default async function AdapterPaginationAnime(page:number,limit:number){
    const url = process.env.URL_API_BASE + `/animes/page/?page=${page}&limit=${limit}`;

    const result = await fetch(url,{ cache:'no-store' }); 

    if(result.status !== 200){
        return undefined
    }

    const totalRecords =  result.headers.get("X-Total-Count");

    const dataResult = await result.json();
        
    return {
        result: dataResult,
        totalRecords: totalRecords,
    };
}