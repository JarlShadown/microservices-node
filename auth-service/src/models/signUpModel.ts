import z from "zod";

export const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    name: z.string(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;