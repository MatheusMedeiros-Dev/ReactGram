require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Atualização do diretório
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Conexão com o banco de dados
require("./config/db.js");
// Rotas
const router = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
