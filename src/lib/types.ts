import { z } from "zod";
import { userValidator, shortUserValidator } from "./validators";

export type User = z.infer<typeof userValidator>;
export type shortUser = z.infer<typeof shortUserValidator>;
