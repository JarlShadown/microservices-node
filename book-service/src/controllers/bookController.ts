import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const getBooks = asyncHandler(async (req: Request, res: Response) => {
    const books = await prisma.book.findMany();
    res.json(books);
});

export const createBook = asyncHandler(async (req: Request, res: Response) => {
    const { title, author, isbn, price } = req.body;
    const book = await prisma.book.create({
        data: { title, author, isbn, price },
    });
    res.status(201).json(book);
});

export const getBookById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (!book) {
        throw new AppError("Book not found", 404);
    }
    res.json(book);
});

export const updateBook = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, isbn, price } = req.body;

    // Check if book exists first
    const existingBook = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (!existingBook) {
        throw new AppError("Book not found", 404);
    }

    const book = await prisma.book.update({
        where: { id: Number(id) },
        data: { title, author, isbn, price },
    });
    res.json(book);
});

export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if book exists first
    const existingBook = await prisma.book.findUnique({ where: { id: Number(id) } });
    if (!existingBook) {
        throw new AppError("Book not found", 404);
    }

    const book = await prisma.book.delete({ where: { id: Number(id) } });
    res.json(book);
});

