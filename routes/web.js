import express from "express";
import { getNomorSurat, createNomorSurat, updateNomorSurat, deleteNomorSurat, searchNomorSurat } from "../controllers/nomorSuratController.js";
import { getAkun, register, login, forgotPassword } from "../controllers/AkunController.js";
import { auth } from "./middleware/auth.js";
import { createOrganisasi, getOrganisasi } from "../controllers/OrganisasiController.js";

const router = express.Router();

//test
router.get("/", (req, res) => {
  res.send("API Berhasil!");
})

//nomor surat
router.get("/nomor-surat",auth, getNomorSurat);
router.post("/nomor-surat",auth, createNomorSurat);
router.put("/nomor-surat/:id",auth, updateNomorSurat);
router.delete("/nomor-surat/:id", auth, deleteNomorSurat);
router.post("/nomor-surat/search", auth, searchNomorSurat)

//akun
router.get("/akun", getAkun);
router.post("/akun", register);
router.post("/login", login);
router.get("/organisasi", getOrganisasi);
router.put("/forgot-password", forgotPassword);
router.post("/organisasi", createOrganisasi)

export default router;
