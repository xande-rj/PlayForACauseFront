import { object, string } from "zod";

export const LoginFormSchema = object({
  username: string(),
  password: string(),
});