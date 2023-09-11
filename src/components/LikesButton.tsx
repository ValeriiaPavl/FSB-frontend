import { Like } from "@/lib/types";
import { userValidator } from "@/lib/validators";
import { z } from "zod";
import { Button } from "./ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const LikeButtonPropsValidator = z.object({
  user: userValidator,
});

type LikeButtonProps = z.infer<typeof LikeButtonPropsValidator>;

const LikeButton = ({ user }: LikeButtonProps) => {
  const [likeState, setlikeState] = useState<boolean>(user.liked);
  const [token, setToken] = useState<String | null>(null);

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
    setlikeState(true);
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
            <Button variant="destructive" type="submit">
              Like user
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
