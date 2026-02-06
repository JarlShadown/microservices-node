import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
};

export default authenticateToken;
