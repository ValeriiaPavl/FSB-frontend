import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import ImgUpload from "@/components/ImgUpload";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
  ssr: false,
});

const userFromFormValidator = z.object({
  username: z.string().max(100),
  email: z.string().email(),
  password: z.string().min(4),

  user_description: z.string(),
  year_of_birth: z.number().gt(1920).lt(2022),
  gender: z.union([
    z.literal("not_specified"),
    z.literal("male"),
    z.literal("female"),
    z.literal("different"),
  ]),
});

type userFromForm = z.infer<typeof userFromFormValidator>;

const RegisterProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userFromForm>({ resolver: zodResolver(userFromFormValidator) });

  const router = useRouter();
  const [location, setLocation] = useState<number[] | null>(null);

  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFormSubmit = (data: userFromForm) => {
    console.log(data.username, data.gender, imageUrl, location);

    const postUser = async () => {
      const response = await axios.post(`${backendUrl}/users`, {
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        profile: {
          user_description: data.user_description,
          year_of_birth: data.year_of_birth,
          gender: data.gender,
          city_of_residence_latitude: parseFloat(location[0].toFixed(6)),
          city_of_residence_longitude: parseFloat(location[1].toFixed(6)),
          user_avatar: imageUrl,
        },
      });
      router.push("/users");
    };
    postUser();
  };

  const onImageUpload = (url: string) => {
    console.log(url);
    setImageUrl(url);
  };

  const onMapClick = (location: number[]) => {
    console.log("I am here");
    setLocation(location);
  };

  useEffect(() => {
    if (location) {
      // Handle the clicked location here
      console.log(
        `Location clicked in parent: Latitude ${location}, Longitude ${location}`
      );
    }
  }, [location]);

  return (
    <main>
      <NavBar />
      <h1>Create profile page</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="username"> Enter your username</label>
        <input id="username" {...register("username")}></input>
        {errors.username && (
          <p className="error-msg">{errors.username.message}</p>
        )}
        <label htmlFor="password"> Enter your password</label>
        <input id="password" {...register("password")}></input>
        {errors.password && (
          <p className="error-msg">{errors.password.message}</p>
        )}
        <label htmlFor="email"> Enter your email</label>
        <input id="email" {...register("email")}></input>
        {errors.email && <p className="error-msg">{errors.email.message}</p>}

        <label htmlFor="user_description">Enter your bio</label>
        <textarea
          id="user_description"
          {...register("user_description")}
        ></textarea>
        {errors.user_description && (
          <p className="error-msg">{errors.user_description.message}</p>
        )}

        <label htmlFor="year_of_birth">Enter your year of birth</label>
        <input
          type="number"
          id="year_of_birth"
          {...register("year_of_birth", { valueAsNumber: true })}
        ></input>
        {errors.year_of_birth && (
          <p className="error-msg">{errors.year_of_birth.message}</p>
        )}

        <label htmlFor="gender">Your gender</label>
        <select id="gender" {...register("gender")}>
          <option>male</option>
          <option>female</option>
          <option>different</option>
          <option>not_specified</option>
        </select>
        {errors.gender && <p className="error-msg">{errors.gender.message}</p>}

        <ImgUpload onImageUpload={onImageUpload}></ImgUpload>

        <DynamicMap location={location} setLocation={setLocation}></DynamicMap>
        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
};

export default RegisterProfile;
