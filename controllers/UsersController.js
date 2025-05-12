import Users from "../models/users.js";
import bcrypt from "bcrypt";

 function response(res, message, data, statusCode = 200) {
  res.status(statusCode).json([
    {
      message,
      payload: data,
    },
  ]);
}

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    response(res, "Data retrieved successfully", users);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const register = async (req, res) => {

  const { username, nama_lengkap, password, organisasi, jabatan, id } = req.body;
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  let cekUsername;
  cekUsername = await Users.findOne({
    where: {
      username: username,
    },
  });

  if (cekUsername) {
    return response(res, "Username already exists", null, 400);
  }

  try {
    const users = await Users.create({
      username,
      nama_lengkap,
      organisasi,
      jabatan,
      password: hashedPassword,
    });

    response(res, "Data retrieved successfully", users, 201);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const login = async (req, res) => {

  try {
    const { username, password } = req.body;
    const users = await Users.findOne({
      where: {
        username: username,
      },
    });

    if (!users) {
      return response(res, "User not found", null, 404);
    }

    const cocok = await bcrypt.compare(password, users.password);

    if (!cocok) {
      return response(res, "password atau username salah", null, 401);
    }

    response(res, "Login successful", users);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await Users.findOne({
      where: {
        username: username,
      },
    });

    if (!users) {
      return response(res, "User not found", null, 404);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Users.update(
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