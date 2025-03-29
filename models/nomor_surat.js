import { DataTypes } from "sequelize";
import db from "../config/database.js";

const NomorSurat = db.define(
    "nomor-osis",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        jenis_surat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pengirim: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Sekretaris",
        },
        tanggal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bulan: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tahun: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        perihal: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

export default NomorSurat;
