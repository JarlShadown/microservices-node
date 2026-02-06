import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const generateToken = (payload: object, expiresIn: SignOptions["expiresIn"] = "1h") => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};
