import ShortUsersList from "@/components/ShortUsersList";
import NavWithToken from "@/components/NavBar";
import WithToken from "@/components/WithToken";

const ToLikesPage = () => {
  return (
    <div>
      <NavWithToken />
      <WithToken>
        <ShortUsersList linkToUsers="likes/to" header="Who liked you" />;
      </WithToken>
    </div>
  );
};

export default ToLikesPage;
