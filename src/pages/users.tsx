import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";

// 'username', 'gender',
//                   'city_of_residence_latitude',
//                   'city_of_residence_longitude',
//                   'year_of_birth', 'user_avatar',
//                   'user_description', 'interest_hashtags'

const userValidator = z.object({
  username: z.string(),
  city_of_residence_latitude: z.string(),
  city_of_residence_longitude: z.string(),
  year_of_birth: z.number().gt(1920).lt(2022),
  user_description: z.string(),
});

type User = z.infer<typeof userValidator>;
const userArrayValidator = z.array(userValidator);

const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/users/");
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
  console.log(users);
  return (
    <div>
      <h1>All users</h1>
      {users &&
        users.map((user: User) => <p key={user.username}>{user.username}</p>)}
    </div>
  );
};

export default Users;
