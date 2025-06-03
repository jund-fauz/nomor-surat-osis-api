import { BelongsTo, DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./users.js";

const NomorSurat = db.define(
    "nomor-surat",
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        urutan: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        tanggal_surat: {
            type: DataTypes.DATE,
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

User.hasMany(NomorSurat,{foreignKey: 'pengirim', sourceKey: 'username'});
NomorSurat.belongsTo(User, {foreignKey: 'pengirim', targetKey: 'username'});

export default NomorSurat;
