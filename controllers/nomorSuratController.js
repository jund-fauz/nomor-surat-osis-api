import NomorSurat from "../models/nomor_surat.js";
import Users from "../models/users.js";

function response(res, message, data, statusCode = 200) {
  res.status(statusCode).json([
    {
      message,
      payload: data,
    },
  ]);
}

export const getNomorSurat = async (req, res) => {
  try {
    const nomorSurat = await NomorSurat.findAll();
    response(res, "Data retrieved successfully", nomorSurat);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};


export const createNomorSurat = async (req, res) => {
  const { jenis_surat, pengirim,tanggal_surat, perihal, link } = req.body;
  
  const user = await Users.findOne({
    where:{
      username: pengirim
    }
  })

  if (!user) {
    return response(res, "User not found", null, 404);
  }

  const totalSurat = await NomorSurat.count();
  const urutan = totalSurat + 1;

  try {
    const nomorSurat = await NomorSurat.create({
      urutan,
      jenis_surat,
      pengirim,
      tanggal_surat,  
      perihal,
      link,
    });

    response(res, "Nomor Surat created successfully", nomorSurat, 201);
  } catch (error) {
    console.error(error);
    response(res, error.message, null, 500);
  }
};

export const updateNomorSurat = async (req, res) => {
  try {
    await NomorSurat.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    response(res, "Nomor Surat updated successfully", {
      jenis_surat: req.body.jenis_surat,
      pengirim: req.body.pengirim,
      tanggal: req.body.tanggal,
      bulan: req.body.bulan,
      tahun: req.body.tahun,
      perihal: req.body.perihal,
      link: req.body.link,
    });
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
