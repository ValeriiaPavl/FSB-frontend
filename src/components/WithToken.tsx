import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

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
      <div>
        <p>
          You are not logged in. Please <Link href="/login">Log in</Link>.
        </p>
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
