'use server'

export default async function AdapterDashboarListByYear(page:number,limit:number,year:number){
    const url = process.env.URL_API_BASE + `/dashboard/year/?page=${page}&limit=${limit}&year=${year}`;

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