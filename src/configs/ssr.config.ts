import { registerAs } from '@nestjs/config';

export default registerAs('ssr', () => ({
  cache: process.env.SSR_CACHE_FILE || 'cache/database.db',
  timeout: Number.parseInt(process.env.SSR_TIMEOUT, 10) || 5 * 60 * 1000,
  args: (process.env.SSR_BROWSER_ARGS && process.env.SSR_BROWSER_ARGS.split(',')) || [
    '--single-process',
    '--no-sandbox',
    '--no-zygote',
  ],
  secure: process.env.SSR_SEURE === 'true' || true,
  domain: process.env.SSR_DOMAIN || 'localhost:3000',
}));
