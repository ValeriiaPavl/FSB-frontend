import Link from "next/link";
import LikeButton from "./LikesButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { UserCardProps } from "@/lib/types";
import UserGeneralInfo from "./UserGeneralInfo";

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
    <CardContent className="flex flex-col">
      <div className="flex flex-row flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 items-start mt-3">
        <UserGeneralInfo user={user} withLink />
        <Button className="py-3 mt-4">
          <Link href="/edit_profile">Edit</Link>
        </Button>
      </div>
    </CardContent>
  ) : (
    <CardContent className="flex flex-row justify-between items-center">
      <UserGeneralInfo user={user} withLink />
      <LikeButton user={user}></LikeButton>
    </CardContent>
  );
};

export default UserCard;
