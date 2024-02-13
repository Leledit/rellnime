import UserComponentDivider from "@/app/_components/user/componentDivider";
import UserGender from "@/app/_components/user/gender";
import UserSideBarPopularAndSearches from "@/app/_components/user/sideBar/popularAndSearches";

export default function HomeGenderPage() {
  return (
    <div>
      <UserComponentDivider
        mainComponet={<UserGender/>}
        sideBar={<UserSideBarPopularAndSearches />}
      />
    </div>
  );
}
