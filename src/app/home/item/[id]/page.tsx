import UserComponentDivider from "@/app/_components/user/componentDivider";
import UserItem from "@/app/_components/user/item";
import UserSideBarPopular from "@/app/_components/user/sideBar/popular";
import Page404 from "@/app/not-found";

interface IProps {
  params: {
    id: string;
  };
}

export default function HomeItemPage({params}:IProps) {
  const id = params.id;

  if(!id){
    return <Page404/>
  }

  return (
    <>
      <UserComponentDivider
        mainComponet={<UserItem idItem={id} />}
        sideBar={<UserSideBarPopular/>}
      />
    </>
  );
}
