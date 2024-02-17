"use client";
import { useEffect, useState } from "react";
import adapterRecentylAdded from "../_adapter/dashboard/recentylAdded";
import UserCarrousel from "../_components/user/carousel";
import UserComponentDivider from "../_components/user/componentDivider";
import UserListingHome from "../_components/user/listing/home";
import UserSideBarPopularAndSearches from "../_components/user/sideBar/popularAndSearches";
import LoadingComponent from "../_components/general/loading";
import { IItemListing } from "../_interface/returnFromApi";

export default function Home() {
  const [dataRecentylAdded, setDataRecentylAdded] = useState<
    IItemListing[] | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultDataRecentyl: IItemListing[] | undefined =
          await adapterRecentylAdded();
        setDataRecentylAdded(resultDataRecentyl);
        setLoading(false);
      } catch (error) {
        console.log("Problemas ao buscar os dados " + error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {!loading ? (
        dataRecentylAdded && dataRecentylAdded.length > 0 ? (
          <UserCarrousel dataRecentlyAdded={dataRecentylAdded} />
        ) : (
          <></>
        )
      ) : (
        <div style={{ marginTop: "50px" }}>
          <LoadingComponent height={80} width={80} loading={loading} />
        </div>
      )}
      <UserComponentDivider
        mainComponet={<UserListingHome />}
        sideBar={<UserSideBarPopularAndSearches />}
      />
    </>
  );
}
