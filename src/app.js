import express from "express";

const app = express();

app.use(express.json());

app.get("/teste", (req, res) => {
  res.status(200).send({ mensagem: "boas-vindas à API" });
});

export default app;
