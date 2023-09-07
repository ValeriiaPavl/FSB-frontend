import Tag from "@/components/Tag";
import { TagType } from "@/components/Tag";
import Link from "next/link";
import { z } from "zod";
import { userValidator, likeArrayValidator } from "@/lib/validators";
import { Like } from "@/lib/types";
import LikeButton from "./LikesButton";
import { useState, useEffect } from "react";
import axios from "axios";

const frontendUrl = process.env.NEXT_PUBLIC_REACT_APP_FRONTEND_URL;

const UserCardPropsValidator = z.object({
  user: userValidator,
  likes: likeArrayValidator,
});

type UserCardProps = z.infer<typeof UserCardPropsValidator>;

const UserCard = ({ user, likes }: UserCardProps) => {
  const [placeName, setPlace] = useState<string>("");

  if (likes) {
    const likesTo = likes.map((like: Like) => like.to_person);
    console.log(likesTo);
  }

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
        console.error("Error during reverse geocoding:", error);
        return "Location not found";
      }
    };
    reverseGeocode(
      parseFloat(user.city_of_residence_latitude),
      parseFloat(user.city_of_residence_longitude)
    );
  }, []);

  return (
    <div key={`${user.user_id}_user_card`} className="user-card">
      <img className="user-avatar-small" src={user.user_avatar} />
      <div className="user-info">
        <p>
          Name:
          <Link href={`${frontendUrl}/users/${user.user_id}`}>
            {user.username}
          </Link>
        </p>
        <p>Gender: {user.gender}</p>
        <p>Year of birth: {user.year_of_birth}</p>
        <p>User description: {user.user_description}</p>
        <p>Location: {placeName} </p>
        <LikeButton user={user} likes={likes}></LikeButton>

        <div>
          {user.interest_hashtags &&
            user.interest_hashtags.map((tag: TagType) => (
              <Tag key={`${user.user_id}${tag}`} tag={tag}></Tag>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
