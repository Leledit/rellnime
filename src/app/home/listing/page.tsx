import UserComponentDivider from "@/app/_components/user/componentDivider";
import UserListingPage from "@/app/_components/user/listing/page";
import UserSideBarPopularAndSearches from "@/app/_components/user/sideBar/popularAndSearches";

interface IProps{
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function HomeListingPage({searchParams}:IProps) {

  return (
    <>
      <UserComponentDivider
        mainComponet={<UserListingPage params={searchParams} />}
        sideBar={<UserSideBarPopularAndSearches />}
      />
    </>
  );
}
