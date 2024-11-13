import Link from "next/link";
import { TagType } from "./InterestButton";
import Tag from "./Tag";
import { Button } from "./ui/button";
import { User } from "@/lib/types";
import { z } from "zod";
import { baseUserValidator, extendedUserValidator } from "@/lib/validators";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const userGeneralInfoType = z.object({
  user: baseUserValidator,
  withLink: z.boolean().default(false),
});

const UserGeneralInfo = ({
  user,
  withLink,
}: z.infer<typeof userGeneralInfoType>) => {
  return (
    <div className="flex flex-row  rounded flex-wrap md:flex-nowrap lg:flex-nowrap gap-5 items-center mt-3">
      <Avatar className="w-40 h-40 border-4 border-[#124d6a]">
        <AvatarImage src={user.user_avatar} />
        <AvatarFallback>{user.username}</AvatarFallback>
      </Avatar>
      <div
        key={`${user.user_id}short_user_card`}
        className="user-card-short w-full"
      >
        {" "}
        {}
        <div>
          {withLink ? (
            <div>
              <div className="font-bold mr-2">Name:</div>
              <Button variant="link">
                <Link href={`users/extended/${user.user_id}`}>
                  {user.username}
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-row justify-between">
              <div>
                <span className="font-bold mr-2">Name:</span>
                <span> {user.username} </span>
              </div>
            </div>
          )}
        </div>
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
        <div className="mt-5">
          {user.interest_hashtags &&
            user.interest_hashtags.map((tag: TagType) => (
              <Tag key={`${user.user_id}${tag}`} tag={tag}></Tag>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserGeneralInfo;
