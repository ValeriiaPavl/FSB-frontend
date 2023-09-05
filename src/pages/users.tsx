import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";
import UserCard from "@/components/UserCard";
import NavWithToken from "@/components/NavBar";

// 'username', 'gender',
//                   'city_of_residence_latitude',
//                   'city_of_residence_longitude',
//                   'year_of_birth', 'user_avatar',
//                   'user_description', 'interest_hashtags'

export const userValidator = z.object({
  username: z.string(),
  gender: z.string().max(20),
  city_of_residence_latitude: z.string(),
  city_of_residence_longitude: z.string(),
  year_of_birth: z.number().gt(1920).lt(2022),
  user_description: z.string(),
  user_avatar: z.string(),
  interest_hashtags: z.string().array(),
  user_id: z.number().int(),
});

export type User = z.infer<typeof userValidator>;
const userArrayValidator = z.array(userValidator);

export const LikeValidator = z.object({
  id: z.number().int(),
  like_added: z.string(),
  from_person: z.number().int(),
  to_person: z.number().int(),
});

export type Like = z.infer<typeof LikeValidator>;

export const likeArrayValidator = z.array(LikeValidator);

const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [likes, setLikes] = useState<Like[] | null>(null);

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
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/likes/from`
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
    getLikes();
  }, []);

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
