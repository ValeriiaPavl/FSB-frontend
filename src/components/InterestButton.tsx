import { z } from "zod";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";

const tagValidator = z.string();
export type TagType = z.infer<typeof tagValidator>;

export interface TagProps {
  tag: string;
}

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const formSchema = z.object({
  interest: z.string().min(2, {
    message: "interest should be more than 2 symbols",
  }),
});

const InterestButton = ({
  interestNumberCount,
  setInterestNumberCount,
}: {
  interestNumberCount: number;
  setInterestNumberCount: Dispatch<SetStateAction<number>>;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [token, setToken] = useState<String | null>(null);
  const router = useRouter();

  // get token
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { interest: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (token) {
      console.log(token);
      const addInterest = async () => {
        try {
          const response = await axios.post(
            `${backendUrl}/hashtags/add`,
            {
              name: values.interest,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            router.push("/");
            setInterestNumberCount(interestNumberCount + 1);
          } else {
            console.error("Unexpected response status", response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      addInterest();
    } else {
      console.log("doesn't work");
    }
    form.reset();
  }

  const handleClick = () => setIsClicked(!isClicked);
  return (
    <div>
      <Button
        className="p-5 mt-3 mb-5 bg-violet-200 text-black hover:bg-violet-300"
        onClick={handleClick}
      >
        {isClicked ? "Hide the field" : "+ Add an interest"}
      </Button>
      <div className={!isClicked ? "hidden" : "block"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-row mt-5 mb-5">
              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="type your interest here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="ml-5" type="submit">
                +Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InterestButton;
