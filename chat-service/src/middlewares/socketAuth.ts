import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
    let token = socket.handshake.auth?.token || socket.handshake.headers?.authorization;

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7);
    }

    if (!token) return next(new Error('Authentication error: Token missing'));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_key');
        (socket as any).user = decoded;
        next();
    } catch (err) {
        next(new Error('Authentication error: Invalid token'));
    }
};