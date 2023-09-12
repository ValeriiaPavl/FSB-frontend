import { z } from "zod";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import NavWithToken from "@/components/NavBar";
import { shortUser } from "@/lib/types";
import { shortUserArrayValidator } from "@/lib/validators";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ShortUserCard from "@/components/ShortUserCard";

const ShortUserList = () => {
  const [token, setToken] = useState<String | null>(null);
  const [users, setUsers] = useState<shortUser[] | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      console.log("hello");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/likes/from`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
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
  }, [token]);

  console.log(users);

  return (
    <div>
      <NavWithToken />

      <div className="flex flex-row justify-center">
        <main className="flex flex-col content-center">
          <Card className="flex flex-row justify-center">
            <div>
              <CardHeader>
                <CardTitle className="text-center mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Users that you liked
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-column content-center">
                <div className="w-auto grid grid-cols-3 gap-4 pt-2">
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
    </div>
  );
};

export default ShortUserList;
