import { validate } from "uuid";
import Akun from "../models/akun.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function response(res, message, data, statusCode = 200, token = null) {
  res.status(statusCode).json([
    {
      message,
      payload: data,
      token: token,
    },
  ]);
}

export const getAkun = async (req, res) => {
  try {
    const akun = await Akun.findAll();
    response(res, "Data retrieved successfully", akun);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const register = async (req, res) => {
  const { id_organisasi, username, nama_lengkap, password, jabatan } = req.body;

  if (!id_organisasi || !username || !nama_lengkap || !password || !jabatan) {
    return response(res, "All fields are required", null, 400);
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const cekUsername = await Akun.findOne({
      where: { username },
    });

    if (cekUsername) {
      return response(res, "Username already exists", null, 400);
    }

    const akun = await Akun.create({
      id_organisasi,
      username,
      nama_lengkap,
      jabatan,
      password: hashedPassword,
    });

    response(res, "Akun berhasil dibuat", akun, 201);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const akun = await Akun.findOne({
      where: {
        username: username,
      },
    });

    if (!akun) {
      return response(res, "User not found", null, 404);
    }

    const cocok = await bcrypt.compare(password, akun.password);

    if (!cocok) {
      return response(res, "password atau username salah", null, 401);
    }

    const token = jwt.sign(
      { id: akun.id,username: akun.username, Organisasi: akun.Organisasi, role: akun.jabatan },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    response(res, "Login successful", akun, 200, token);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { username, newPassword, confirmPassword } = req.body;

    const akun = await Akun.findOne({
      where: {
        username: username,
      },
    });

    if (!akun) {
      return response(res, "User not found", null, 404);
    }

    if (newPassword !== confirmPassword) {
      return response(res, "Password does not match", null, 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await Akun.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          username: username,
        },
      }
    );

    response(res, "Password updated successfully", null);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const validateAkun = async (akun) => {
  let valid = false;
  try {
    const { id_organisasi, username, nama_lengkap, jabatan, password } = akun;
    valid =
      validate(id_organisasi) &&
      typeof username === "string" &&
      typeof nama_lengkap === "string" &&
      typeof jabatan === "string" &&
      typeof password === "string";
  } catch (error) {}
  return valid;
};
