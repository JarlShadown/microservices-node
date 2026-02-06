import { z } from "zod";

export const bookSchemaCreate = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    isbn: z.string().min(10, "ISBN must be at least 10 characters"),
    price: z.number().positive("Price must be positive"),
});

export const bookSchemaUpdate = z.object({
    id: z.number("Invalid ID"),
    title: z.string().min(1, "Title is required").optional(),
    author: z.string().min(1, "Author is required").optional(),
    isbn: z.string().min(10, "ISBN must be at least 10 characters").optional(),
    price: z.number().positive("Price must be positive").optional(),
});

export type BookInput = z.infer<typeof bookSchemaCreate>;
export type BookUpdate = z.infer<typeof bookSchemaUpdate>;