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

export const getBookById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await prisma.book.findUnique({ where: { id: Number(id) } });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, author, isbn, price } = req.body;
        const book = await prisma.book.update({
            where: { id: Number(id) },
            data: { title, author, isbn, price },
        });
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await prisma.book.delete({ where: { id: Number(id) } });
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
