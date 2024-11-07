import { z } from "zod";
import { userValidator, shortUserLikeToValidator } from "./validators";

export type User = z.infer<typeof userValidator>;
export type shortUser = z.infer<typeof shortUserLikeToValidator>;

const UserCardPropsValidator = z.object({
  user: userValidator,
  isMe: z.boolean(),
  token: z.string().optional(),
});
export type UserCardProps = z.infer<typeof UserCardPropsValidator>;
