import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'sqlite',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number.parseInt(process.env.DATABASE_PORT, 10) || 5432,
  name: process.env.DATABASE_NAME || 'ussr',
  username: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
}));
