import z from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     SignUpInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 *         name:
 *           type: string
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 */

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type LoginInput = z.infer<typeof loginSchema>;