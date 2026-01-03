// redisClient.js
import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();


const redisClient = createClient({
  socket: {
    host:'192.168.0.43',
    port: 6379,
  },
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

// Connect once, on first import
redisClient.connect().catch((err) => {
  console.error('❌ Failed to connect to Redis:', err);
});

export default redisClient;