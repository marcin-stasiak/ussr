import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  name: process.env.DATABASE_NAME || 'ussr',
  // username: process.env.DATABASE_USERNAME || '',
  // password: process.env.DATABASE_PASSWORD || '',
}));
