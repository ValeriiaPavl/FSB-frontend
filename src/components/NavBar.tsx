import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface NavWithTokenProps {
  children: ReactNode;
}

const NavWithToken = (props: NavWithTokenProps) => {
  const [checked, setChecked] = useState<"noToken" | "hasToken">("noToken");
  useEffect(() => {
    const tokenFromLs = localStorage.getItem("token");
    if (!tokenFromLs) {
      setChecked("noToken");
    } else {
      setChecked("hasToken");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setChecked("noToken");
  };

  return (
    <div className="sticky top-0 z-10">
      <nav className="nav-bar flex items-center">
        <div className="mx-auto container relative flex items-center justify-between content-center">
          <span className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            ⭐ FSB
          </span>
          {checked === "hasToken" ? (
            <>
              <Button variant="link">
                <Link href="/users" className="text-lg font-semibold">
                  All users
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/likes/from" className="text-lg font-semibold">
                  Likes from you
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/likes/to" className="text-lg font-semibold">
                  Who liked you
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/likes/mutual" className="text-lg font-semibold">
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
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="link">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavWithToken;
