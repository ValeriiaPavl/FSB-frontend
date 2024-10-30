import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
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
import NavWithToken from "@/components/NavBar";

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const userFromFormValidator = z.object({
  username: z.string().max(100),
  password: z.string().min(4).max(100),
});

type userFromForm = z.infer<typeof userFromFormValidator>;

const UserLogin = () => {
  const router = useRouter();
  const form = useForm<userFromForm>({
    resolver: zodResolver(userFromFormValidator),
  });

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
      console.log(response.data.token);
      router.push("/users");
    };
    postUser();
  };

  return (
    <div>
      <NavWithToken />
      <main className="flex flex-row justify-center">
        <div className="flex flex-col content-center">
          <Card className="w-full gap-4 pt-2 flex-row justify-center px-20">
            <CardHeader>
              <CardTitle className="text-center mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Login page
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
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;
