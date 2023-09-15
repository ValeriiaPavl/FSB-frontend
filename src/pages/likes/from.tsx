import NavWithToken from "@/components/NavBar";
import ShortUsersList from "@/components/ShortUsersList";
import WithToken from "@/components/WithToken";

const ShortUserList = () => {
  return (
    <div>
      <NavWithToken />
      <WithToken>
        <ShortUsersList
          header="Users that you liked"
          linkToUsers="likes/from"
        ></ShortUsersList>
      </WithToken>
    </div>
  );
};

export default ShortUserList;
