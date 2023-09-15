import ShortUsersList from "@/components/ShortUsersList";
import NavWithToken from "@/components/NavBar";
import WithToken from "@/components/WithToken";

const MutualLikesPage = () => {
  return (
    <div>
      <NavWithToken />
      <WithToken>
        <ShortUsersList linkToUsers="likes/mutual" header="Mutual Likes" />
      </WithToken>
    </div>
  );
};

export default MutualLikesPage;
