import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type checkState = "checking" | "hasToken" | "noToken";

interface WithTokenProps {
  children: ReactNode;
}

const WithToken = (props: WithTokenProps) => {
  const [checked, setChecked] = useState<checkState>("checking");
  useEffect(() => {
    const tokenFromLs = localStorage.getItem("token");
    if (!tokenFromLs) {
      setChecked("noToken");
    } else {
      setChecked("hasToken");
    }
  }, []);

  if (checked === "checking") {
    return (
      <div>
        <p>Checking Auth..</p>
      </div>
    );
  }

  if (checked === "noToken") {
    return (
      <div className="flex justify-center">
        <Card className=" flex mt-5  w-1/2 justify-center items-center">
          <CardContent className="flex mt-5">
            <span className="">
              You are not logged in. Please{" "}
              <Link href="/login">
                <b>Log in</b>
              </Link>
              .
            </span>
          </CardContent>
        </Card>
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
