import Redis from 'ioredis';

// El host 'redis' coincide con el nombre del servicio en tu docker-compose.yml
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const redis = new Redis(REDIS_URL, {
    maxRetriesPerRequest: null, // Recomendado para evitar errores con BullMQ o Streams
    retryStrategy: (times) => {
        // Reintento exponencial para que el servicio no muera si Redis tarda en arrancar
        return Math.min(times * 50, 2000);
    },
});

redis.on('connect', () => {
    console.log('🚀 Redis Client Connected');
});

redis.on('error', (err) => {
    console.error('❌ Redis Error:', err);
});

export default redis;