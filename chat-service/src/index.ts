import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import redis from './lib/redis';
import { socketAuth } from './middlewares/socketAuth';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "*" } // En producción, limita esto a tu dominio
});

// Configurar Redis Adapter para escalabilidad horizontal
const pubClient = redis.duplicate();
const subClient = redis.duplicate();
io.adapter(createAdapter(pubClient, subClient));

// Aplicar el middleware de seguridad
io.use(socketAuth);

io.on('connection', (socket) => {
    const user = (socket as any).user;
    console.log(`⚡ Usuario conectado: ${user.username} (${socket.id})`);

    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user_joined', { user: user.username });
    });

    socket.on('send_message', (data) => {
        const { roomId, message } = data;
        io.to(roomId).emit('new_message', {
            from: user.username,
            text: message,
            time: new Date().toISOString()
        });
    });

    socket.on('disconnect', () => console.log('👋 Usuario desconectado'));
});

const PORT = process.env.PORT || 5005;
httpServer.listen(PORT, () => console.log(`💬 Chat Service on port ${PORT}`));