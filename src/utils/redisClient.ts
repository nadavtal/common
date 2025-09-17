import Redis from 'ioredis';
import type { Redis as RedisType } from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient: RedisType = new Redis(redisUrl);

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redisClient;
export type { RedisType };