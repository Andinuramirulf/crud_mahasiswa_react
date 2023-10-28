import express from "express";
import { Create, Delete, Read, ReadById, Update } from "../controller/mahasiswa-controller.js";

const router = express.Router();

router.get("/mahasiswa", Read);
router.get("/mahasiswa/:id", ReadById);
router.post("/mahasiswa", Create);
router.put("/mahasiswa", Update);
router.delete("/mahasiswa", Delete);

export default router;