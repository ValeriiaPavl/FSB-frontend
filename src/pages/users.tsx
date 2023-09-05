import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";
import UserCard from "@/components/UserCard";
import NavWithToken from "@/components/NavBar";
import {
  LikeValidator,
  userValidator,
  userArrayValidator,
  likeArrayValidator,
} from "@/lib/validators";
import { User, Like } from "@/lib/types";

// 'username', 'gender',
//                   'city_of_residence_latitude',
//                   'city_of_residence_longitude',
//                   'year_of_birth', 'user_avatar',
//                   'user_description', 'interest_hashtags'

const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [likes, setLikes] = useState<Like[] | null>(null);
  const [token, setToken] = useState<String | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/`
        );
        const validated = userArrayValidator.safeParse(response.data);
        if (validated.success) {
          setUsers(validated.data);
        } else {
          console.log(validated.error.flatten());
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getLikes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/likes/from`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const validated = likeArrayValidator.safeParse(response.data);
        if (validated.success) {
          setLikes(validated.data);
        } else {
          console.log(validated.error.flatten());
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    };
    if (token !== null) {
      getLikes();
    }
  }, [token]);

  return (
    <div className="users-list">
      <NavWithToken />
      <h1>All users</h1>
      {users &&
        likes &&
        users.map((user: User) => (
          <UserCard
            key={`${user.user_id}_user_card`}
            user={user}
            likes={likes}
          ></UserCard>
        ))}
    </div>
  );
};

export default Users;
