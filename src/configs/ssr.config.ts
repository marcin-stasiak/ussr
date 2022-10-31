import { registerAs } from '@nestjs/config';

export default registerAs('ssr', () => ({
  cache: process.env.CACHE_FILE || 'cache/database.db',
  args: (process.env.BROWSER_ARGS && process.env.BROWSER_ARGS.split(',')) || [
    '--single-process',
    '--no-sandbox',
    '--no-zygote',
  ],
}));
