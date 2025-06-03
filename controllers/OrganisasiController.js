import Organisasi from '../models/organisasi.js';

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
}

export const createOrganisasi = async (req, res) => {
    const { id, nama_organisasi, jabatan,  } = req.body;
    try {
        const organisasi = await Organisasi.create({
            organisasi,
            nama,
        });
        response(res, "Organisasi created successfully", organisasi, 201);
    } catch (error) {
        console.error(error);
        response(res, error.message, null, 500);
    }
}