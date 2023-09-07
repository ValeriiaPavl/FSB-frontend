import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const userFromFormValidator = z.object({
  username: z.string().max(100),
  password: z.string().min(4).max(100),
});

type userFromForm = z.infer<typeof userFromFormValidator>;

const UserLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userFromForm>({ resolver: zodResolver(userFromFormValidator) });

  const handleFormSubmit = (data: userFromForm) => {
    console.log(data.username, data.password);
    if (!data.username || !data.password) {
      return;
    }

    const postUser = async () => {
      const response = await axios.post(`${backendUrl}/login`, {
        username: data.username,
        password: data.password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/users");
    };
    postUser();
  };

  return (
    <main>
      <NavBar />
      <h1>User login page</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="username"> Enter your username</label>
        <input id="username" {...register("username")}></input>
        {errors.username && (
          <p className="error-msg">{errors.username.message}</p>
        )}

        <label htmlFor="password">Enter your password</label>
        <input id="password" {...register("password")}></input>
        {errors.password && (
          <p className="error-msg">{errors.password.message}</p>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
};

export default UserLogin;
