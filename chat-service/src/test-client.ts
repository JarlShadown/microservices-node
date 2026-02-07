import { io } from "socket.io-client";
import jwt from "jsonwebtoken";

// 1. Generamos un token de prueba (debe coincidir con la clave en chat-service)
const SECRET = "mysecretpassword256lenght_mysecretpassword256lenght_mysecretpassword256lenght_mysecretpassword256lenght_mysecretpassword256lenght_mysecretpassword256lenght";
const testToken = jwt.sign({ username: "MiguelTest", id: "123" }, SECRET);

console.log("🔑 Token de prueba generado:", testToken);

// 2. Conectamos al servidor en el puerto 5005
const socket = io("http://localhost:5005", {
    auth: {
        token: testToken
    }
});

socket.on("connect", () => {
    console.log("✅ Conectado al Chat Service! ID:", socket.id);

    // 3. Unirse a una sala
    const room = "sala-general";
    socket.emit("join_room", room);
    console.log(`🏠 Uniéndose a la sala: ${room}`);
});

socket.on("user_joined", (data: { user: string }) => {
    console.log(`👤 ${data.user} se ha unido al chat`);
});

socket.on("new_message", (data: { from: string; text: string }) => {
    console.log(`📩 [${data.from}]: ${data.text}`);
});

socket.on("connect_error", (err: Error) => {
    console.error("❌ Error de conexión:", err.message);
});

// 4. Enviar un mensaje después de 2 segundos
setTimeout(() => {
    console.log("📤 Enviando mensaje de prueba...");
    socket.emit("send_message", {
        roomId: "sala-general",
        message: "¡Hola desde el cliente de prueba!"
    });
}, 2000);
