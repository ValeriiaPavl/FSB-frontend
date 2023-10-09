import axios from "axios";
import { useState, useEffect } from "react";
import NavWithToken from "@/components/NavBar";
import { shortUser } from "@/lib/types";
import {
  shortUserArrayValidator,
  shortUserLikeToValidator,
} from "@/lib/validators";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ShortUserCard from "@/components/ShortUserCard";
import { z } from "zod";

const shortUserListPropsValidator = z.object({
  linkToUsers: z.string(),
  header: z.string().min(5),
});

type shortUserListProps = z.infer<typeof shortUserListPropsValidator>;

const ShortUsersList = ({ linkToUsers, header }: shortUserListProps) => {
  const [token, setToken] = useState<String | null>(null);
  const [users, setUsers] = useState<shortUser[] | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
  }, []);

  useEffect(() => {
    if (token !== null) {
      const getUsers = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/${linkToUsers}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          console.log(token);
          const validated = shortUserArrayValidator.safeParse(response.data);
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
    }
  }, [token]);

  console.log(users);

  return (
    <div className="flex flex-row justify-center px-3 py-3">
      <main className="flex flex-col content-center">
        <Card className="flex flex-col justify-center justify-items-center">
          <div>
            <CardHeader>
              <CardTitle className="text-center mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                {header}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col content-center">
              <div className="w-auto flex flex-wrap md:flex-wrap items-center justify-center lg:flex-wrap gap-4 pt-2">
                {users &&
                  users.map((user: shortUser) => (
                    <ShortUserCard
                      key={`${user.to_person_id}_user_card`}
                      user={user}
                    ></ShortUserCard>
                  ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ShortUsersList;
