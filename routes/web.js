import express from "express";
import { getNomorSurat, createNomorSurat, updateNomorSurat, deleteNomorSurat } from "../controllers/NomorSuratController.js";
import { getUsers, register, login, forgotPassword } from "../controllers/UsersController.js";
import { getOrganosasi } from "../controllers/OrganisasiController.js";

const router = express.Router();

//nomor surat
router.get("/nomor-surat", getNomorSurat);
router.post("/nomor-surat", createNomorSurat);
router.put("/nomor-surat/:id", updateNomorSurat);
router.delete("/nomor-surat/:id", deleteNomorSurat);

//users
router.get("/users", getUsers);
router.post("/users", register);
router.post("/login", login);
router.get("/organisasi", getOrganosasi);
router.put("/forgot-password", forgotPassword);

export default router;
