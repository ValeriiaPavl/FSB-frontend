import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/router";

interface NavWithTokenProps {
  children?: ReactNode;
}

const NavWithToken = (props: NavWithTokenProps) => {
  const [checked, setChecked] = useState<"noToken" | "hasToken">("noToken");
  const [token, setToken] = useState<String | null>(null);
  const [userIdFromToken, setUserId] = useState<number | null>(null);
  const [currUser, setCurrUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const tokenFromLs = localStorage.getItem("token");
    if (!tokenFromLs) {
      setChecked("noToken");
    } else {
      setChecked("hasToken");
    }
  }, []);

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
          await setUserId(response.data.user_id);
        } catch (error) {
          console.log("Something went wrong");
        }
      };
      getId();
    }
  }, [token]);

  useEffect(() => {
    if (userIdFromToken) {
      const getCurrUser = async () => {
        try {
          console.log("getting image");
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/users/extended/${userIdFromToken}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          await setCurrUser(response.data);
        } catch (error) {
          console.log("Something went wrong");
        }
      };
      getCurrUser();
    }
  }, [userIdFromToken, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setChecked("noToken");
    router.push("/login");
  };

  return (
    <div className="flex sticky top-0 z-10">
      <nav className="flex-grow text-[#f5deb3] bg-[#124d6a]">
        <div className="px-2 py-2 relative flex items-center justify-between content-center w-full flex-wrap">
          <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            ⭐ FSB FindSomeBuddy
          </span>
          {checked === "hasToken" ? (
            <>
              {" "}
              <a href={`/users/extended/${userIdFromToken}`}>
                <Avatar className="w-20 h-20 border-4 border-[#f5deb3] hover:scale-110">
                  <AvatarImage src={currUser?.user_avatar} />
                  <AvatarFallback>{currUser?.username}</AvatarFallback>
                </Avatar>
              </a>
              <Button variant="link">
                <Link
                  href="/users"
                  className="text-lg font-semibold text-[#f5deb3]"
                >
                  All users
                </Link>
              </Button>
              <Button variant="link">
                <Link
                  href="/likes/from"
                  className="text-lg font-semibold text-[#f5deb3]"
                >
                  <p>Likes from you</p>
                </Link>
              </Button>
              <Button variant="link">
                <Link
                  href="/likes/to"
                  className="text-lg font-semibold text-[#f5deb3]"
                >
                  Who liked you
                </Link>
              </Button>
              <Button variant="link">
                <Link
                  href="/likes/mutual"
                  className="text-lg font-semibold text-[#f5deb3]"
                >
                  Mutual likes
                </Link>
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="link">
                <Link
                  href="/login"
                  className="text-lg font-semibold text-[#f5deb3]"
                >
                  Login
                </Link>
              </Button>
              <Button variant="link">
                <Link
                  href="/register"
                  className="text-lg font-semibold text-[#f5deb3]"
                >
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavWithToken;
