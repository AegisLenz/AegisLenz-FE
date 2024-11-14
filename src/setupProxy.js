const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/server",
    createProxyMiddleware({
      target: "http://203.252.213.209:80", // ElasticSearch 서버 주소
      changeOrigin: true,
      onProxyRes: (proxyRes) => {
        // 응답 시간 로깅 (선택 사항)
        console.log("Response status code:", proxyRes.statusCode);
      },
    })
  );
};
