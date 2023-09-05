import { z } from "zod";
import { userValidator, LikeValidator } from "./validators";

export type User = z.infer<typeof userValidator>;
export type Like = z.infer<typeof LikeValidator>;
