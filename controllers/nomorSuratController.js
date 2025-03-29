import NomorSurat from "../models/nomor_surat.js";

export const getNomorSurat = async (req, res) => {
    try {
        const nomorSurat = await NomorSurat.findAll();
        res.json(nomorSurat);
    } catch (error) {
        console.log(error);
    }
}

export const createNomorSurat = async (req, res) => {
    try {
        const nomorSurat = await NomorSurat.create(req.body);
        res.json(nomorSurat);
    } catch (error) {
        console.log(error);
    }
}

export const updateNomorSurat = async (req, res) => {
    try {
        const nomorSurat = await NomorSurat.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json(nomorSurat);
    } catch (error) {
        console.log(error);
    }
}   

export const deleteNomorSurat = async (req, res) => { 
    try {
        await NomorSurat.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({message: "Nomor Surat Deleted"});
    } catch (error) {
        console.log(error);
    }
}