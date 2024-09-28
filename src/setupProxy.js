const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:9200",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // '/api' 부분을 제거하고 ElasticSearch로 전달
      },
    })
  );
};
