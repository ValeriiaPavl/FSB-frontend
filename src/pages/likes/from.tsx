import NavWithToken from "@/components/NavBar";
import ShortUsersList from "@/components/ShortUsersList";

const ShortUserList = () => {
  return (
    <div>
      <NavWithToken />
      <ShortUsersList
        header="Users that you liked"
        linkToUsers="likes/from"
      ></ShortUsersList>
    </div>
  );
};

export default ShortUserList;
