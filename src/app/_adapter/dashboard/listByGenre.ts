'use server'

export default async function AdapterDashboarListByGenre(page:number,limit:number,genre:string){
    const url = process.env.URL_API_BASE + `/dashboard/genre/?page=${page}&limit=${limit}&genre=${genre}`;

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