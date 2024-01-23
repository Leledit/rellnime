'use server'
export default async function adapterListAllGenres(){
    const url = process.env.URL_API_BASE + `/genres/`;

    const result = await fetch(url,{ cache:'no-store' }); 

    if(result.status !== 200){
        return undefined
    }

    const dataResult = await result.json();
    return dataResult;
}