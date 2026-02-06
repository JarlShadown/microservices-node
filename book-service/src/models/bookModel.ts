import { z } from "zod";

export const bookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    isbn: z.string().min(10, "ISBN must be at least 10 characters"),
    price: z.number().positive("Price must be positive"),
});

export type BookInput = z.infer<typeof bookSchema>;
