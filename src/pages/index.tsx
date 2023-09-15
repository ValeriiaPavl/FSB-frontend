import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/users");
  }, [router]);
  return <p>redirecting</p>;
};

export default Index;
