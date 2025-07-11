import express from "express";
import { auth } from "./middleware/auth.js";
import { getNomorSurat, createNomorSurat, updateNomorSurat, deleteNomorSurat, searchNomorSurat } from "../controllers/NomorSuratController.js";
import { getAkun, register, login, forgotPassword } from "../controllers/AkunController.js";
import { createOrganisasi, getOrganisasi } from "../controllers/OrganisasiController.js";

const router = express.Router();

//test
router.get("/", (req, res) => {
  res.send("API Berhasil!");
})

//akun
router.get("/akun", getAkun);
router.post("/akun", register);
router.post("/login", login);
router.get("/organisasi", getOrganisasi);
router.put("/forgot-password", forgotPassword);
router.post("/organisasi", createOrganisasi)

//nomor surat
router.get("/nomor-surat",auth, getNomorSurat);
router.post("/nomor-surat",auth, createNomorSurat);
router.put("/nomor-surat/:id",auth, updateNomorSurat);
router.delete("/nomor-surat/:id", auth, deleteNomorSurat);
router.post("/nomor-surat/search", auth, searchNomorSurat)


export default router;
