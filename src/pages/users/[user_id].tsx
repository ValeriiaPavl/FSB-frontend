import { useRouter } from "next/router";
import { User, userValidator } from "../users";
import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "@/components/UserCard";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import NavWithToken from "@/components/NavBar";

const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
  ssr: false,
});

const UserPage = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (user_id) {
      const getUser = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/${user_id}`
          );
          const validated = userValidator.safeParse(response.data);
          if (validated.success) {
            setUser(validated.data);
          } else {
            console.log(validated.error.flatten());
          }
        } catch (error) {
          console.log("Something went wrong");
        }
      };
      getUser();
    }
  }, [user_id]);

  {
    if (user) {
      return (
        <main>
          <NavWithToken />
          <UserCard {...user} />
          <DynamicMap
            city_of_residence_latitude={user.city_of_residence_latitude}
            city_of_residence_longitude={user.city_of_residence_longitude}
          />
          ;
        </main>
      );
    } else {
      <h1>Doesn't work this way</h1>;
    }
  }
};

export default UserPage;