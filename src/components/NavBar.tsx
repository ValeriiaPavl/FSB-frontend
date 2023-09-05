import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const NavWithToken = () => {
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

  if (checked === "noToken") {
    console.log(checked);
    return (
      <nav className="nav-bar">
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </nav>
    );
  } else {
    console.log(checked);
    return (
      <nav className="nav-bar">
        <Link href="/users">All users</Link>
        <Link href="/likes/from">Likes from you</Link>
        <Link href="/likes/to">Who liked you</Link>
        <Button variant="destructive" onClick={handleLogout}>
          Log Out
        </Button>
      </nav>
    );
  }
};

export default NavWithToken;
