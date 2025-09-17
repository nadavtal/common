import Redis from 'ioredis';
import type { Redis as RedisType } from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
let redisClient: RedisType | null = null;

const getRedisClient = (): RedisType => {
  if (!redisClient) {
    console.log('Initializing Redis connection...');
    redisClient = new Redis(redisUrl);

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
  }
  
  return redisClient;
};

export default getRedisClient;
export type { RedisType };
