import { useRouter } from "next/router";
import { userValidator } from "@/lib/validators";
import { User } from "@/lib/types";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import UserCard from "@/components/UserCard";
import NavWithToken from "@/components/NavBar";
import WithToken from "@/components/WithToken";
import InterestButton from "@/components/InterestButton";

const UserPage = () => {
  const router = useRouter();
  console.log("router query =", router.query);
  const user_id: number = parseInt(router.query.user_id as string);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<String | null>(null);
  const [userIdFromToken, setUserId] = useState<number | null>(null);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [interestNumberCount, setInterestNumberCount] = useState<number>(
    user?.interest_hashtags.length ?? 0
  );

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token) {
      const getId = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/id_from_token`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUserId(response.data.user_id);
        } catch (error) {
          console.log("Something went wrong");
        }
      };
      getId();
    }
  }, [token]);

  useEffect(() => {
    console.log("third effect", user_id, userIdFromToken);
    if (user_id === userIdFromToken) {
      setIsMe(true);
    }
  }, [user_id, userIdFromToken]);

  useEffect(() => {
    if (user_id) {
      if (
        token !== null ||
        interestNumberCount != user?.interest_hashtags.length
      ) {
        const getUser = async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/extended/${user_id}`,
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
    }
  }, [user_id, token, interestNumberCount, user?.interest_hashtags]);

  if (user) {
    return (
      <main>
        <NavWithToken />
        <WithToken>
          <div className="flex flex-row justify-center">
            <Card className="flex flex-col items-center">
              <UserCard isMe={isMe} user={user} />
              {isMe && (
                <InterestButton
                  interestNumberCount={interestNumberCount}
                  setInterestNumberCount={setInterestNumberCount}
                />
              )}
            </Card>
          </div>
        </WithToken>
      </main>
    );
  } else {
    <h1>{"Doesn't work this way"}</h1>;
  }
};

export default UserPage;
