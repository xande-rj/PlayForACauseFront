const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app: { use: (arg0: string, arg1: any) => void; }) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      ws: true,
    })
  );
};
