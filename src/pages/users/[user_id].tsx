import { useRouter } from "next/router";
import { userValidator } from "@/lib/validators";
import { User } from "@/lib/types";
import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "@/components/UserCard";
import NavWithToken from "@/components/NavBar";

const UserPage = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<String | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
  }, []);

  useEffect(() => {
    if (user_id) {
      const getUser = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/${user_id}`,
            { headers: { Authorization: `Bearer ${token}` } }
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
          <UserCard user={user} />;
        </main>
      );
    } else {
      <h1>Doesn't work this way</h1>;
    }
  }
};

export default UserPage;
