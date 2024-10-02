const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:9200", // ElasticSearch 서버 주소
      changeOrigin: true,
      onProxyRes: (proxyRes) => {
        // 응답 시간 로깅 (선택 사항)
        console.log("Response status code:", proxyRes.statusCode);
      },
    })
  );
};
