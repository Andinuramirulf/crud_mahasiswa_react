import express from "express";
import db from "./config/database.js";
import router from "./routes/index.js";
import MahasiswaModel from "./models/mahasiswa-model.js";

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

try {
    await db.authenticate();
    console.log("database connected...");
    await MahasiswaModel.sync();
} catch (error) {
    console.error("connection error", error);
}

app.use(express.json());

app.use(router);

app.listen(5000, () => console.log("server running at port 5000"));