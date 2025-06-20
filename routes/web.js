import express from "express";
import { getNomorSurat, createNomorSurat, updateNomorSurat, deleteNomorSurat } from "../controllers/NomorSuratController.js";
import { getAkun, register, login, forgotPassword } from "../controllers/AkunController.js";
import { auth } from "./middleware/auth.js";
import { getOrganisasi } from "../controllers/OrganisasiController.js";

const router = express.Router();

//nomor surat
router.get("/nomor-surat",auth, getNomorSurat);
router.post("/nomor-surat",auth, createNomorSurat);
router.put("/nomor-surat/:id",auth, updateNomorSurat);
router.delete("/nomor-surat/:id",auth, deleteNomorSurat);

//akun
router.get("/akun", getAkun);
router.post("/akun", register);
router.post("/login", login);
router.get("/organisasi", getOrganisasi);
router.put("/forgot-password", forgotPassword);

export default router;
