'use client';
import { useEffect, useState } from "react";
import UserMenu from "./_components/user/menu";
import adapterRecentylAdded from "./_adapter/dashboard/recentylAdded";
import UserCarrousel from "./_components/user/carousel";

export default function Home() {

  const [dataRecentylAdded,setDataRecentylAdded] = useState<any[]>();

  useEffect(()=>{
    searchingForNecessaryData()
  },[]);

  return (
    <main>
        <UserMenu/>
        {theRecentlyAddedComponentShouldBeDisplayed()}
    </main>
  )

  async function searchingForNecessaryData(){
      //Buscando dados dos ultimos titulos lançados
      const resultDataRecentyl = await adapterRecentylAdded();
      setDataRecentylAdded(resultDataRecentyl);
  }

  function theRecentlyAddedComponentShouldBeDisplayed(){
    if(dataRecentylAdded && dataRecentylAdded.length>0){
      return <UserCarrousel dataRecentlyAdded={dataRecentylAdded} />
    }else{
      return <></>
    }
  }
}
