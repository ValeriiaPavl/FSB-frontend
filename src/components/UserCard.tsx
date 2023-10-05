import Tag from "@/components/Tag";
import { TagType } from "@/components/Tag";
import Link from "next/link";
import { boolean, z } from "zod";
import { userValidator } from "@/lib/validators";
import LikeButton from "./LikesButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const frontendUrl = process.env.NEXT_PUBLIC_REACT_APP_FRONTEND_URL;

const UserCardPropsValidator = z.object({
  user: userValidator,
  isMe: z.boolean(),
});

type UserCardProps = z.infer<typeof UserCardPropsValidator>;

const UserCard = ({ user, isMe }: UserCardProps) => {
  const [placeName, setPlace] = useState<string>("");

  useEffect(() => {
    const reverseGeocode = async (latitude: number, longitude: number) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        const data = await response.data;

        if (data.display_name) {
          setPlace(data.display_name);
          console.log(data.city_district);
        } else {
          console.log("Geocoding data not found");
        }
      } catch (error) {
        console.log("Error during reverse geocoding:", error);
        return "Location not found";
      }
    };
    reverseGeocode(
      parseFloat(user.city_of_residence_latitude),
      parseFloat(user.city_of_residence_longitude)
    );
  }, []);

  return isMe ? (
    <Card key={`${user.user_id}_user_card`}>
      {/* <CardHeader className="items-center"> */}
      <CardContent className="flex flex-row flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 items-center mt-3">
        <Avatar className="w-40 h-40 border-4 border-[#124d6a]">
          <AvatarImage src={user.user_avatar} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>

        <div
          key={`${user.user_id}short_user_card`}
          className="user-card-short w-full"
        >
          <p>
            <span className="font-bold mr-2">Name:</span>
            <Button variant="link">
              <Link href={`users/extended/${user.user_id}`}>
                {user.username}
              </Link>
            </Button>
          </p>
          <p>
            <span className="font-bold mr-2">Gender:</span>
            {user.gender}
          </p>
          <p>
            <span className="font-bold mr-2">Year of birth: </span>
            {user.year_of_birth}
          </p>
          <p>
            <span className="font-bold mr-2">User description: </span>
            {user.user_description}
          </p>

          <div>
            {user.interest_hashtags &&
              user.interest_hashtags.map((tag: TagType) => (
                <Tag key={`${user.user_id}${tag}`} tag={tag}></Tag>
              ))}
          </div>
        </div>
        <Button className="py-3">
          <Link href="/edit_profile">Edit</Link>
        </Button>
      </CardContent>
    </Card>
  ) : (
    <Card key={`${user.user_id}_user_card`}>
      {/* <CardHeader className="items-center"> */}
      <CardContent className="flex flex-row flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 items-center mt-3">
        <Avatar className="w-40 h-40 border-4 border-[#124d6a]">
          <AvatarImage src={user.user_avatar} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>

        <div
          key={`${user.user_id}short_user_card`}
          className="user-card-short w-full"
        >
          <p>
            <span className="font-bold mr-2">Name:</span>
            <Button variant="link">
              <Link href={`users/extended/${user.user_id}`}>
                {user.username}
              </Link>
            </Button>
          </p>
          <p>
            <span className="font-bold mr-2">Gender:</span>
            {user.gender}
          </p>
          <p>
            <span className="font-bold mr-2">Year of birth: </span>
            {user.year_of_birth}
          </p>
          <p>
            <span className="font-bold mr-2">User description: </span>
            {user.user_description}
          </p>
          <p>
            <span className="font-bold mr-2">Approximate distance: </span>{" "}
            {user.distance.toFixed(1)} km{" "}
          </p>

          <div>
            {user.interest_hashtags &&
              user.interest_hashtags.map((tag: TagType) => (
                <Tag key={`${user.user_id}${tag}`} tag={tag}></Tag>
              ))}
          </div>
        </div>
        <LikeButton user={user}></LikeButton>
      </CardContent>
    </Card>
  );
};

export default UserCard;
