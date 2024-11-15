import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { baseUserArrayValidator, userArrayValidator } from "@/lib/validators";
import { BaseUser, User } from "@/lib/types";
import UserGeneralInfo from "./UserGeneralInfo";
import Loading from "./loading";

type checkState = "checking" | "hasToken" | "noToken";

interface WithTokenProps {
  children: ReactNode;
}

const WithToken = (props: WithTokenProps) => {
  const [checked, setChecked] = useState<checkState>("checking");
  const [users, setUsers] = useState<BaseUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const tokenFromLs = localStorage.getItem("token");
    if (!tokenFromLs) {
      setChecked("noToken");
    } else {
      setChecked("hasToken");
    }
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users`
        );
        console.log(response.data);
        const validated = baseUserArrayValidator.safeParse(response.data);
        if (validated.success) {
          setUsers(validated.data);
        } else {
          console.log(validated.error.flatten());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  console.log(users);

  if (checked === "checking") {
    return (
      <div>
        <p>Checking Auth..</p>
      </div>
    );
  }

  if (checked === "noToken") {
    return (
      <div className="flex flex-col justify-center items-center">
        <Card className=" flex mt-5  w-1/2 justify-center items-center">
          <CardContent className="flex mt-5">
            <span className="text-lg text-center">
              You are not logged in. Please{" "}
              <Link href="/login">
                <b>Log in</b>
              </Link>
              .
            </span>
          </CardContent>
        </Card>
        {isLoading ? (
          <Loading />
        ) : (
          <Card className=" flex mt-5  w-1/2 justify-center items-center">
            <CardContent className="flex flex-col mt-5">
              <div className="users-list">
                {users &&
                  users.map((user: BaseUser) => (
                    <Card
                      key={`${user.user_id}_user_card`}
                      className="relative"
                    >
                      <CardContent>
                        <div className="flex flex-row flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 items-start mt-3">
                          <UserGeneralInfo
                            user={user}
                            withLink={false}
                          ></UserGeneralInfo>
                          <div className="bg-red-50 rounded-lg text-red-800 absolute top-4 right-5 p-2">
                            login to see more
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (checked === "hasToken") {
    // Here we return just the children
    return <>{props.children}</>;
  } else {
    return null;
  }
};

export default WithToken;
