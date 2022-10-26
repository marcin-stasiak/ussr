export default () => ({
  name: 'Universal Server Side Renderer',
  development: process.env.NODE_ENV !== 'production',
  port: Number.parseInt(process.env.PORT, 10) || 3000,
});
