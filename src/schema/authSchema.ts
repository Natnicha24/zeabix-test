import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string(),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    cfPassword: z.string(),
    role: z.string(),
  })
  .refine((data) => data.password === data.cfPassword, {
    path: ["cfPassword"],
    message: "Passwords do not match",
  });

export const loginScheme = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginForm = z.infer<typeof loginScheme>;
export type RegisterForm = z.infer<typeof registerSchema>;
