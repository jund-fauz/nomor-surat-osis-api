import NomorSurat from "../models/nomor_surat.js";
import Akun from "../models/akun.js";

function response(res, message, data, statusCode = 200) {
  res.status(statusCode).json({
    message,
    payload: data,
  });
}

export const getNomorSurat = async (req, res) => {
  const userId = req.akun_id;

  try {
    if (!userId) {
      return response(res, "User not authenticated", null, 401);
    }

    const user = await Akun.findOne({
      where: { id: userId },
    });

    if (!user) {
      return response(res, "User not found", null, 404);
    }

    const nomorSurat = await NomorSurat.findAll({
      where: {
        id_organisasi: user.id_organisasi,
      },
    });

    response(res, "Data retrieved successfully", nomorSurat);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const createNomorSurat = async (req, res) => {
  const { jenis, perihal, link } = req.body;

  try {
    const userId = req.akun_id;

    if (!userId) {
      return response(res, "User not authenticated", null, 401);
    }

    const user = await Akun.findOne({
      where: { id: userId },
    });

    if (!user) {
      return response(res, "User not found", null, 404);
    }

    const totalSurat = await NomorSurat.count({
      where: { id_organisasi: user.id_organisasi },
    });
    const urutan = totalSurat + 1;
    const now = new Date().toISOString().split("T")[0];

    const nomorSurat = await NomorSurat.create({
      urutan,
      jenis,
      id_pengirim: user.id,
      tanggal: now,
      link,
      perihal,
      id_organisasi: user.id_organisasi,
    });

    response(res, "Nomor Surat created successfully", nomorSurat, 201);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const updateNomorSurat = async (req, res) => {
  const { jenis, perihal, link } = req.body;

  try {
    const userId = req.akun_id;

    if (!userId) {
      return response(res, "User not authenticated", null, 401);
    }

    const user = await Akun.findOne({
      where: { id: userId },
    });

    if (!user) {
      return response(res, "User not found", null, 404);
    }

    const now = new Date();
    const [updated] = await NomorSurat.update(
      {
        jenis,
        perihal,
        link,
        tanggal: now,
        id_pengirim: user.id,
        id_organisasi: user.id_organisasi,
      },
      {
        where: { id: req.params.id },
      }
    );

    if (updated === 0) {
      return response(res, "Nomor Surat not found", null, 404);
    }

    const updatedNomorSurat = await NomorSurat.findOne({
      where: { id: req.params.id },
    });

    response(res, "Nomor Surat updated successfully", updatedNomorSurat);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const deleteNomorSurat = async (req, res) => {
  try {
    await NomorSurat.destroy({
      where: {
        id: req.params.id,
      },
    });
    response(res, "Nomor Surat deleted successfully", null);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const searchNomorSurat = async (req, res) => {
  const { organisasi, query, key } = req.body;
  try {
    let nomorSurat;
    if (key === "nomor")
      nomorSurat = await NomorSurat.findAll({
        where: { id_organisasi: organisasi, urutan: query },
      });
    else
      nomorSurat = await NomorSurat.findAll({
        where: { id_organisasi: organisasi },
      });
    response(res, "Data retrieved successfully", nomorSurat);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};
