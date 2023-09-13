import ShortUsersList from "@/components/ShortUsersList";
import NavWithToken from "@/components/NavBar";

const MutualLikesPage = () => {
  return (
    <div>
      <NavWithToken />
      <ShortUsersList linkToUsers="likes/mutual" header="Mutual Likes" />
    </div>
  );
};

export default MutualLikesPage;
