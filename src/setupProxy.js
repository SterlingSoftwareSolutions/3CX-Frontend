const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://3cx-crm-backend.ap-southeast-1.elasticbeanstalk.com',
      changeOrigin: true,
    })
  );
};
