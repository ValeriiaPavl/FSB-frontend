import { z } from "zod";
import { userValidator, shortUserLikeToValidator } from "./validators";

export type User = z.infer<typeof userValidator>;
export type shortUser = z.infer<typeof shortUserLikeToValidator>;
