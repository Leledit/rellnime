import UserComponentDivider from "@/app/_components/user/componentDivider";
import UserListingPage from "@/app/_components/user/listing/page";
import UserSideBarPopularAndSearches from "@/app/_components/user/sideBar/popularAndSearches";

export default function HomeItemPage() {
  return (
    <>
      <UserComponentDivider
        mainComponet={"ndf"}
        sideBar={<UserSideBarPopularAndSearches />}
      />
    </>
  );
}
