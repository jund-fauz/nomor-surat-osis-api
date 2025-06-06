import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/web.js";
import { createOrganisasi, validateOrganisasi } from "./controllers/OrganisasiController.js";
import { register, validateAkun } from "./controllers/AkunController.js";
import { validate } from "uuid";

dotenv.config();

const app = express();
const port = process.env.DATABASE_PORT || 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

app.get("/", (req, res) => {
    res.send("Api Siap!");
});

app.post("/admin/register", (req, res) => {
    const { akun, organisasi } = req.body;
    if (!validate(organisasi))
        if (validateOrganisasi(organisasi)) {
            createOrganisasi(organisasi, res)
            akun.id_organisasi = organisasi.id
            if (validateAkun(akun))
                register(akun, res)
            else
                res.status(400).json({
                    message: "Invalid request body",
                    at: 'akun'
                })
        } else
            res.status(400).json({
                message: "Invalid request body",
                at: 'organisasi'
            })
    else {
        akun.id_organisasi = organisasi
        if (validateAkun(akun))
            register(akun, res)
        else
            res.status(400).json({
                message: "Invalid request body",
                at: 'akun'
            })
    }
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});