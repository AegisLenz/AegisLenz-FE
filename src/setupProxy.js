const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/server",
    createProxyMiddleware({
      target: "http://18.207.84.45:4040",
      changeOrigin: true,
      onProxyRes: (proxyRes) => {
        // 응답 시간 로깅 (선택 사항)
        console.log("Response status code:", proxyRes.statusCode);
      },
    })
  );
};
