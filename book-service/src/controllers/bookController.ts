import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, author, isbn, price } = req.body;
        const book = await prisma.book.create({
            data: { title, author, isbn, price },
        });
        res.status(201).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
