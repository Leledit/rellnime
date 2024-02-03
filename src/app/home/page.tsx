'use client';
import { useEffect, useState } from "react";
import adapterRecentylAdded from "../_adapter/dashboard/recentylAdded";
import UserCarrousel from "../_components/user/carousel";

export default function Home() {

  const [dataRecentylAdded,setDataRecentylAdded] = useState<any[]>();

  useEffect(()=>{
    searchingForNecessaryData()
  },[]);

 
  return (
    <>
        {theRecentlyAddedComponentShouldBeDisplayed()}
    </>
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
