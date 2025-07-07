import { validate } from "uuid";
import Organisasi from "../models/organisasi.js";
import { register, validateAkun } from "./AkunController.js";

function response(res, message, data, statusCode = 200) {
  res.status(statusCode).json([
    {
      message,
      payload: data,
    },
  ]);
}

export const getOrganisasi = async (req, res) => {
  try {
    const organisasi = await Organisasi.findAll();
    response(res, "Data retrieved successfully", organisasi, 200);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const createOrganisasi = async (req, res) => {
  const { akun, organisasi } = req.body;
  if (!validate(organisasi))
    if (validateOrganisasi(organisasi)) {
      try {
        const new_organisasi = await Organisasi.create({
          organisasi,
        });
        response(res, "Organisasi created successfully", new_organisasi, 201);
      } catch (error) {
        console.error(error);
        response(res, error.message, null, 500);
      }
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
};

export const validateOrganisasi = async (organisasi) => {
  let valid = false;
  try {
    const {
      nama,
      kode_divisi,
      divisi,
      kode_jenis_surat,
      jenis_surat,
      format_nomor_surat,
      periode,
      password,
      periode_dimulai,
    } = organisasi;
    val =
      typeof nama === "string" &&
      Array.isArray(kode_divisi) &&
      Array.isArray(divisi) &&
      Array.isArray(kode_jenis_surat) &&
      Array.isArray(jenis_surat) &&
      typeof format_nomor_surat === "string" &&
      typeof periode === "number" &&
      typeof password === "string" &&
      typeof periode_dimulai === Date;
  } catch (error) {}
  return valid;
};
