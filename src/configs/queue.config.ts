import { registerAs } from '@nestjs/config';

export default registerAs('queue', () => ({
  name: process.env.RABBITMQ_NAME || 'ussr',
  host: process.env.RABBITMQ_HOST || 'localhost:5672',
  user: process.env.RABBITMQ_USER || 'guest',
  password: process.env.RABBITMQ_PASSWORD || 'guest',
}));
