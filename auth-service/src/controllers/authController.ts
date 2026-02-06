import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { generateToken } from "../utils/jwt.js";
import redis from "../lib/redis.js";

export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, 10),
            },
        });
        const token = generateToken({ userId: user.id, email: user.email });
        res.json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User or password invalid" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ message: "User or password invalid" });
        }
        const token = generateToken({ userId: user.id, email: user.email });
        await redis.set(`user:${user.id}`, token, "EX", 3600);
        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        await redis.del(`user:${userId}`);
        res.json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}