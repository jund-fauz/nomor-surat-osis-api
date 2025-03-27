import express from "express";
import { getNomorSurat, createNomorSurat, updateNomorSurat, deleteNomorSurat } from "../controllers/nomorSuratController.js";

const router = express.Router();

router.get("/nomor-surat", getNomorSurat);
router.post("/nomor-surat", createNomorSurat);
router.put("/nomor-surat/:id", updateNomorSurat);
router.delete("/nomor-surat/:id", deleteNomorSurat);

export default router;
