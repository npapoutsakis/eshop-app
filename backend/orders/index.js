import cors from "cors";
import express from "express";
const app = express();
const port = 5000;

app.use(cors);

app.get("/", (req, res) => {
  return res.send("<h1>Hello Nikos!</h1>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
