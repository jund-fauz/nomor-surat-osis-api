import { BelongsTo, DataTypes } from "sequelize";
import db from "../config/database.js";
import Akun from "./akun.js";

const NomorSurat = db.define(
    "nomor-surat",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        urutan: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_pengirim: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        tanggal: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        jenis: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        perihal: {
            type: DataTypes.TEXT,
            allowNull: false,
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

Akun.hasMany(NomorSurat,{foreignKey: 'id_pengirim', sourceKey: 'id'});
NomorSurat.belongsTo(Akun, {foreignKey: 'id_pengirim', targetKey: 'id'});

export default NomorSurat;
