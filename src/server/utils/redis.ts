import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL ?? '6379');

redis.on('connect', () => {
  console.log('Redis database connected');
});

redis.on('reconnecting', () => {
  console.log('Redis reconnecting');
});

redis.on('ready', () => {
  console.log('Redis is ready');
});

redis.on('error', (error) => {
  console.log('Something went wrong', error);
});

export { redis };
