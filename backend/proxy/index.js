import cors from "cors";
import express from "express";
import httpProxy from "http-proxy";

const app = express();
const apiProxy = httpProxy.createProxyServer();

const PORT = 8888;

app.use(cors());
app.use(express.json());

app.post("/introspect", (req, res) => {
  apiProxy.web(req, res, {
    target:
      "http://localhost:8080/auth/realms/eshop/protocol/openid-connect/token/",
    changeOrigin: true,
    body: req.body,
  });
});

app.post("/token", (req, res) => {
  apiProxy.web(req, res, {
    target: "http://localhost:8080/auth/realms/eshop/protocol/openid-connect/",
    changeOrigin: true,
    body: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
