import { shortUserValidator } from "@/lib/validators";
import { z } from "zod";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

const shortUserCardPropsValidator = z.object({
  user: shortUserValidator,
});

type shortUserCardProps = z.infer<typeof shortUserCardPropsValidator>;

const frontendUrl = process.env.NEXT_PUBLIC_REACT_APP_FRONTEND_URL;

const ShortUserCard = ({ user }: shortUserCardProps) => {
  return (
    <div key={`${user.to_person_id}_user_card`} className="user-card-short">
      <Avatar>
        <AvatarImage src={user.user_avatar} />
        <AvatarFallback>{user.username}</AvatarFallback>
      </Avatar>
      <div className="user-info">
        <p>
          Name:
          <Link href={`${frontendUrl}/users/${user.to_person_id}`}>
            {user.username}
          </Link>
        </p>
        <p>Gender: {user.gender}</p>
        <p>Like added: {user.like_added}</p>
      </div>
    </div>
  );
};

export default ShortUserCard;
