import z from "zod";

export const signupInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

//Exporting Types
export type SignupInput = z.infer<typeof signupInput>;
export type LoginInput = z.infer<typeof loginInput>;
