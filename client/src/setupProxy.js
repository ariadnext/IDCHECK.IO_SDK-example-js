const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  // local server
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );

  app.use(
    '/examples',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );

  // For DOM mode in order to proxy idcheckio sdk API call
  app.use(
    '/rest',
    proxy({
      target: 'https://sdkweb-test.idcheck.io',
      changeOrigin: true,
    }),
  );
  app.use(
    '/wss-falcon',
    proxy({
      target: 'wss://sdkweb-test.idcheck.io/wss-falcon',
      ws: true,
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/wss-falcon': '',
      },
    }),
  );
};
