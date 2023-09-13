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

  const handleLikeSubmit = () => {
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
  };

  return (
    <div className="like-button shrink-0">
      {likeState ? (
        <div className="relative">
          <img src="/heart-fill.svg" className="like-button-image" />
          <div className="absolute flex items-center justify-center inset-0">
            <span className="text-white font-bold top-[-8px] relative">
              Liked
            </span>
          </div>
        </div>
      ) : (
        <div>
          {/* <form className="like-form" onSubmit={handleLikeSubmit}> */}
          <button
            type="button"
            onClick={handleLikeSubmit}
            className="relative hover:scale-110 transition ease-in duration-200"
          >
            <img src="/heart.svg" className="like-button-image" />
            <div className="absolute flex items-center justify-center inset-0">
              <span className="text-[#ff0000] font-bold top-[-8px] relative">
                Like
              </span>
            </div>
          </button>
          {/* <Button variant="destructive" type="submit">
              Like user
            </Button> */}
          {/* </form> */}
        </div>
      )}
    </div>
  );
};

export default LikeButton;
