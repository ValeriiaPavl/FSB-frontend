import ShortUsersList from "@/components/ShortUsersList";
import NavWithToken from "@/components/NavBar";

const ToLikesPage = () => {
  return (
    <div>
      <NavWithToken />
      <ShortUsersList linkToUsers="likes/to" header="Who liked you" />;
    </div>
  );
};

export default ToLikesPage;
