import cors from "cors";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT = 8888;
const app = express();

app.use(cors());

const keycloakProxy = createProxyMiddleware({
  target: "http://keycloak:8080", // Replace with your Keycloak container name and port
  changeOrigin: true,
  pathRewrite: {
    "^/checktoken":
      "/auth/realms/eshop/protocol/openid-connect/token/introspect",
  },
});

// Handle POST requests to /checktoken
app.post("/checktoken", (req, res) => {
  keycloakProxy(req, res, (error) => {
    if (error) {
      res.status(500).send(error.message);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
