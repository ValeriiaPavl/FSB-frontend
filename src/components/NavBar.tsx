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

const MenuList = () => {
  const [isToken, setIsToken] = useState<boolean>(false);
  const [token, setToken] = useState<String | null>(null);
  const [userIdFromToken, setUserId] = useState<number | null>(null);
  const [currUser, setCurrUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const tokenFromLs = localStorage.getItem("token");
    if (!tokenFromLs) {
      setIsToken(false);
    } else {
      setIsToken(true);
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
    setIsToken(false);
    router.push("/login");
  };

  return (
    <ul className="text-lg font-semibold lg:flex lg:gap-3 lg:gap-y-8">
      {isToken ? (
        <>
          <li>
            <Button variant="link">
              <Link
                className="text-lg font-semibold text-[#f5deb3]"
                href={`/users/extended/${userIdFromToken}`}
              >
                <p>Your profile</p>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link
                className="text-lg font-semibold text-[#f5deb3]"
                href="/users"
                // className="text-lg font-semibold text-[#f5deb3]"
              >
                <p>All users</p>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link
                href="/likes/from"
                className="text-lg font-semibold text-[#f5deb3]"
              >
                <p>Likes from you</p>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link
                href="/likes/to"
                className="text-lg font-semibold text-[#f5deb3]"
              >
                <p>Who liked you</p>
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link
                href="/likes/mutual"
                className="text-lg font-semibold text-[#f5deb3]"
              >
                <p>Mutual likes</p>
              </Link>
            </Button>
          </li>
          <li className="ml-4 ">
            <Button variant="destructive" onClick={handleLogout}>
              <p>Log Out</p>
            </Button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Button variant="link">
              <Link
                href="/login"
                className="text-lg font-semibold text-[#f5deb3]"
              >
                Login
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link
                href="/register"
                className="text-lg font-semibold text-[#f5deb3]"
              >
                Register
              </Link>
            </Button>
          </li>
        </>
      )}
    </ul>
  );
};

const NavWithToken = (props: NavWithTokenProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex sticky top-0 z-10 h-1/6 items-stretch">
      <nav className="flex flex-grow text-[#f5deb3] bg-[#124d6a] items-center">
        <div className="px-2 py-2 relative flex flex-col items-center justify-start content-center w-full flex-wrap">
          <p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl lg:mb-8">
            ⭐ FSB FindSomeBuddy
          </p>
          <section className="MOBILE-MENU flex flex-col lg:hidden mt-4 mb-4">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8 animate-pulse bg-[#f5deb3]"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-[#f5deb3]"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-[#f5deb3]"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="absolute top-0 right-0 px-4 pt-4 pb-0 text-[#f5deb3]"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <MenuList />
            </div>
          </section>
          <div className="DESKTOP-MENU flex-row hidden space-x-8 lg:flex">
            <MenuList />
          </div>
        </div>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        padding-bottom: 1rem;
        display: flex;
        border: solid 1px light-grey;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 5px;
        position: absolute;
        width: auto;
        // height: 35vh;
        top: 105%;
        left: 5;
        background: #124d6a;
        text-color: blue
        z-index: 20;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 4rem;
        padding-left: 1rem;
        color: red;

      }
    `}</style>
    </div>
  );
};

export default NavWithToken;
