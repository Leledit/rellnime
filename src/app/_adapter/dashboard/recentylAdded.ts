'use server';
export default async function adapterRecentylAdded(){
    const url = process.env.URL_API_BASE + `/dashboard/recentylAdded/`;

    const result = await fetch(url,{ cache:'no-store' }); 

    if(result.status !== 200){
        return undefined
    }

    const dataResult = await result.json();
    return dataResult;
}