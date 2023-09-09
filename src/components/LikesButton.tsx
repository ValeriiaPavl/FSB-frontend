import { Like } from "@/lib/types";
import { likeArrayValidator } from "@/lib/validators";
import { userValidator } from "@/lib/validators";
import { z } from "zod";
import { Button } from "./ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const LikeButtonPropsValidator = z.object({
  user: userValidator,
  likes: likeArrayValidator,
});

type LikeButtonProps = z.infer<typeof LikeButtonPropsValidator>;

const LikeButton = ({ user, likes }: LikeButtonProps) => {
  const liked = likes
    .map((like: Like) => like.to_person)
    .includes(user.user_id);
  const [token, setToken] = useState<String | null>(null);

  const [likeState, setState] = useState<boolean>(
    likes.map((like: Like) => like.to_person).includes(user.user_id)
  );

  // useEffect(() => {
  //   setState(likeState);
  // }, [likes]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
  }, []);

  const handleLikeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const likeUser = async () => {
      console.log(`${backendUrl}/likes/from`);
      const response = await axios.post(
        `${backendUrl}/likes/from`,
        { to_person: user.user_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    };
    likeUser();
    setState(true);
    event.preventDefault();
  };

  return (
    <div className="like-button">
      {likeState ? (
        <div>
          <img src="/heart-fill.svg" className="like-button-image" />
          <p>Liked</p>
        </div>
      ) : (
        <div>
          <form className="like-form" onSubmit={handleLikeSubmit}>
            <img src="/heart.svg" className="like-button-image" />
            <Button type="submit">Like user</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
