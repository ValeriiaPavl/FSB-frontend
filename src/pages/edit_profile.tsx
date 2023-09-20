import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import NavWithToken from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import ImgUpload from "@/components/ImgUpload";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import WithToken from "@/components/WithToken";

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const DynamicMap = dynamic(() => import("@/components/DynamicMap"), {
  ssr: false,
});

const userFromFormValidator = z.object({
  username: z.string().max(100),
  email: z.string().email().optional(),
  password: z.string().min(4).optional(),
  city_of_residence_latitude: z.string().transform((val) => Number(val)),
  city_of_residence_longitude: z.string().transform((val) => Number(val)),

  user_description: z.string(),
  user_avatar: z.string().url(),
  // year_of_birth: z
  //   .string()
  //   .transform((val) => Number(val))
  //   .pipe(z.number().gt(1920).lt(2022)),
  year_of_birth: z.number().gt(1920).lt(2022),
  gender: z.union([
    z.literal("not_specified"),
    z.literal("male"),
    z.literal("female"),
    z.literal("different"),
  ]),
});

type userFromForm = z.infer<typeof userFromFormValidator>;

interface UserFormValuesProps {
  preloadedValues: userFromForm;
}

const UserForm = ({ preloadedValues }: UserFormValuesProps) => {
  const form = useForm<userFromForm>({
    resolver: zodResolver(userFromFormValidator),
    defaultValues: {
      username: preloadedValues.username,
      email: preloadedValues.email,
      // password: preloadedValues.password,
      user_description: preloadedValues.user_description,
      year_of_birth: preloadedValues.year_of_birth,
      gender: preloadedValues.gender,
      user_avatar: preloadedValues.user_avatar,
      city_of_residence_latitude: preloadedValues.city_of_residence_latitude,
      city_of_residence_longitude: preloadedValues.city_of_residence_longitude,
    },
  });
  const router = useRouter();
  const [location, setLocation] = useState<number[] | null>([
    preloadedValues.city_of_residence_latitude,
    preloadedValues.city_of_residence_longitude,
  ]);
  const [imageUrl, setImageUrl] = useState<string>("");
  // console.log(preloadedValues);

  const handleFormSubmit = (data: userFromForm) => {
    const patchUser = async () => {
      console.log(data);
      const response = await axios.patch(`${backendUrl}/your_profile`, {
        user: {
          username: data.username,
          email: data.email,
        },
        profile: {
          user_description: data.user_description,
          year_of_birth: data.year_of_birth,
          gender: data.gender,
          city_of_residence_latitude: parseFloat(
            location ? location[0].toFixed(6) : "0"
          ),
          city_of_residence_longitude: parseFloat(
            location ? location[1].toFixed(6) : "0"
          ),
          user_avatar: imageUrl,
        },
      });
      router.push("/login");
    };
    patchUser();
  };

  const onImageUpload = (url: string) => {
    console.log(url);
    setImageUrl(url);
  };

  return (
    <div>
      <WithToken>
        <main className="flex flex-row justify-center">
          <div className="flex flex-col content-center">
            <Card className="md:w-full gap-4 pt-2 flex-row justify-center px-40">
              <CardHeader>
                <CardTitle className="text-center mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Edit profile
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-column content-center">
                <Form {...form}>
                  <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your email</FormLabel>
                          <FormControl>
                            <Input placeholder="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="user_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell about yourself"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="z-50 relative mb-20">
                          <FormLabel>Your gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="relative z-10">
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="different">
                                Different
                              </SelectItem>
                              <SelectItem value="not_specified">
                                Not specified
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="year_of_birth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your year of birth</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1921}
                              max={2020}
                              placeholder="1921"
                              {...field}
                              onChange={(event) =>
                                field.onChange(+event.target.value)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* <FormField
                      control={form.control}
                      name="user_avatar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel></FormLabel>
                          <FormControl>
                            <ImgUpload
                              onImageUpload={onImageUpload}
                              {...field}
                            ></ImgUpload>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                    <DynamicMap
                      location={location}
                      setLocation={setLocation}
                    ></DynamicMap>
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </main>
      </WithToken>
    </div>
  );
};

const EditProfile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [token, setToken] = useState<String | null>(null);

  // get token
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // get info about user
  useEffect(() => {
    if (token) {
      const getCurrUser = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/your_profile`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUserData(response.data);
        } catch (error) {
          console.log("Something went wrong");
        }
      };
      getCurrUser();
    }
  }, [token]);

  // console.log(userData);

  return (
    <main>
      <NavWithToken />
      {userData !== null ? (
        <UserForm preloadedValues={userData} />
      ) : (
        <p>data is null</p>
      )}
    </main>
  );
};

export default EditProfile;
