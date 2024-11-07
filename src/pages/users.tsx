import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "@/components/UserCard";
import NavWithToken from "@/components/NavBar";
import { userArrayValidator } from "@/lib/validators";
import { User } from "@/lib/types";
import { Card, CardTitle } from "@/components/ui/card";
import WithToken from "@/components/WithToken";

const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [token, setToken] = useState<String | null>(null);
  const isMe = false;
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
  }, [token]);

  useEffect(() => {
    const getUsers = async () => {
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
    if (token) {
      getUsers();
    }
  }, [token]);

  console.log(users);

  return (
    <div>
      <NavWithToken />
      <WithToken>
        <div className="flex flex-row justify-center">
          <div className="users-list md:w-2/3">
            <CardTitle className="text-center mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              All users
            </CardTitle>

            {users &&
              users
                .sort((a, b) => a.distance - b.distance)
                .map((user: User) => (
                  <Card key={`${user.user_id}_user_card`}>
                    <UserCard isMe={isMe} user={user}></UserCard>
                  </Card>
                ))}
          </div>
        </div>
      </WithToken>
    </div>
  );
};

export default Users;
