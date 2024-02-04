"use client";
import { useEffect, useState } from "react";
import adapterRecentylAdded from "../_adapter/dashboard/recentylAdded";
import UserCarrousel from "../_components/user/carousel";
import UserComponentDivider from "../_components/user/componentDivider";
import UserHomeListing from "../_components/user/homeListing";
import UserSideBarPopularAndSearches from "../_components/user/sideBar/popularAndSearches";

export default function Home() {
  const [dataRecentylAdded, setDataRecentylAdded] = useState<any[]>();

  useEffect(() => {
    searchingForNecessaryData();
  }, []);

  return (
    <>
      {theRecentlyAddedComponentShouldBeDisplayed()}
      <UserComponentDivider
        mainComponet={<UserHomeListing />}
        sideBar={<UserSideBarPopularAndSearches />}
      />
    </>
  );

  async function searchingForNecessaryData() {
    //Buscando dados dos ultimos titulos lançados
    const resultDataRecentyl = await adapterRecentylAdded();
    setDataRecentylAdded(resultDataRecentyl);
  }

  function theRecentlyAddedComponentShouldBeDisplayed() {
    if (dataRecentylAdded && dataRecentylAdded.length > 0) {
      return <UserCarrousel dataRecentlyAdded={dataRecentylAdded} />;
    } else {
      return <></>;
    }
  }
}
