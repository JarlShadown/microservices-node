import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { generateToken } from "../utils/jwt.js";
import redis from "../lib/redis.js";
import { v4 as uuidv4 } from "uuid";

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
        const refreshToken = uuidv4();


        // 3. Guardar Refresh Token en Redis vinculado al usuario
        // Guardamos: refresh_token:uuid -> userId
        await redis.set(`refresh:${refreshToken}`, user.id, "EX", 7 * 24 * 60 * 60);
        res.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token,
            refreshToken,
            expiresIn: 15 * 60
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


export const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(400).json({ error: "Refresh token requerido" });

    try {
        // 1. ¿Existe este refresh token en Redis?
        const userId = await redis.get(`refresh:${refreshToken}`);

        if (!userId) {
            return res.status(401).json({ error: "Refresh token inválido o expirado" });
        }

        // 2. Si existe, generamos un NUEVO Access Token
        const newAccessToken = generateToken({ userId: userId });

        res.json({ accessToken: newAccessToken });

    } catch (error) {
        res.status(500).json({ error: "Error interno" });
    }
};