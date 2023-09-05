import Tag from "@/components/Tag";
import { TagType } from "@/components/Tag";
import Link from "next/link";
import { z } from "zod";
import { userValidator, likeArrayValidator } from "@/lib/validators";
const frontendUrl = process.env.NEXT_PUBLIC_REACT_APP_FRONTEND_URL;

const UserCardPropsValidator = z.object({
  user: userValidator,
  likes: likeArrayValidator,
});

type UserCardProps = z.infer<typeof UserCardPropsValidator>;

const UserCard = ({ user, likes }: UserCardProps) => {
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
