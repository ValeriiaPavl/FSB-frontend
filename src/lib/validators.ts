import { z } from "zod";

export const baseUserValidator = z.object({
  username: z.string(),
  gender: z.union([
    z.literal("male"),
    z.literal("female"),
    z.literal("different"),
    z.literal("not_specified"),
  ]),
  city_of_residence_latitude: z.string(),
  city_of_residence_longitude: z.string(),
  year_of_birth: z.number().gt(1920).lt(2022),
  user_description: z.string(),
  user_avatar: z.string(),
  interest_hashtags: z.string().array(),
  user_id: z.number().int(),
});

export const extendedUserValidator = baseUserValidator.extend({
  distance: z.number(),
  liked: z.boolean(),
});

export const userArrayValidator = z.array(extendedUserValidator);
export const baseUserArrayValidator = z.array(baseUserValidator);

export const shortUserLikeToValidator = z.object({
  username: z.string(),
  user_avatar: z.string(),
  to_person_id: z.number().int(),
  from_person_id: z.number().int(),
  email: z.string().optional(),
  like_added: z
    .string()
    .datetime()
    .transform((val) => val.split("T")[0]),
  gender: z.union([
    z.literal("male"),
    z.literal("female"),
    z.literal("different"),
    z.literal("not_specified"),
  ]),
});

export const shortUserArrayValidator = z.array(shortUserLikeToValidator);
