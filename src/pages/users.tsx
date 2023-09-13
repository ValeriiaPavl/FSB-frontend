import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "@/components/UserCard";
import NavWithToken from "@/components/NavBar";
import { userArrayValidator } from "@/lib/validators";
import { User } from "@/lib/types";

// 'username', 'gender',
//                   'city_of_residence_latitude',
//                   'city_of_residence_longitude',
//                   'year_of_birth', 'user_avatar',
//                   'user_description', 'interest_hashtags'

const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [token, setToken] = useState<String | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      console.log("hello");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/extended`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        const validated = userArrayValidator.safeParse(response.data);
        if (validated.success) {
          setUsers(validated.data);
        } else {
          console.log(validated.error.flatten());
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [token]);

  console.log(users);

  return (
    <div>
      <NavWithToken />
      <div className="users-list">
        <h1>All users</h1>
        {users &&
          users
            .sort((a, b) => a.distance - b.distance)
            .map((user: User) => (
              <UserCard
                key={`${user.user_id}_user_card`}
                user={user}
              ></UserCard>
            ))}
      </div>
    </div>
  );
};

export default Users;
