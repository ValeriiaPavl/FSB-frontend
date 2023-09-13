import { shortUserLikeToValidator } from "@/lib/validators";
import { z } from "zod";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const shortUserCardPropsValidator = z.object({
  user: shortUserLikeToValidator,
});

type shortUserCardProps = z.infer<typeof shortUserCardPropsValidator>;

const frontendUrl = process.env.NEXT_PUBLIC_REACT_APP_FRONTEND_URL;

const ShortUserCard = ({ user }: shortUserCardProps) => {
  return (
    <Card>
      <CardHeader className="items-center">
        <Avatar className="w-32 h-32 border-4 border-[#124d6a]">
          <AvatarImage src={user.user_avatar} />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <div key={`${user.to_person_id}_user_card`} className="user-card-short">
          <div className="user-info">
            <p>
              <span className="font-bold mr-2">Name:</span>
              <Link href={`${frontendUrl}/users/extended/${user.to_person_id}`}>
                {user.username}
              </Link>
            </p>
            <p>
              <span className="font-bold mr-2">Gender:</span>
              {user.gender}
            </p>
            <p>
              <span className="font-bold mr-2">Like added:</span>
              {user.like_added}
            </p>

            {user.email && (
              <p>
                <span className="font-bold mr-2">User email:</span>
                {user.email}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShortUserCard;
