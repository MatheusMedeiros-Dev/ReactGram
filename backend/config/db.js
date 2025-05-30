require("dotenv").config();
const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.av5iy4m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Conectou ao banco.");
    return dbConn;
  } catch (error) {
    console.log("Erro de conexão:", error);
  }
};

conn();

module.exports = conn;
