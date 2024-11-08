import { z } from "zod";
import {
  extendedUserValidator,
  shortUserLikeToValidator,
  baseUserValidator,
} from "./validators";

export type User = z.infer<typeof extendedUserValidator>;
export type BaseUser = z.infer<typeof baseUserValidator>;
export type shortUser = z.infer<typeof shortUserLikeToValidator>;

const UserCardPropsValidator = z.object({
  user: extendedUserValidator,
  isMe: z.boolean(),
  token: z.string().optional(),
});
export type UserCardProps = z.infer<typeof UserCardPropsValidator>;
