import { BelongsTo, DataTypes } from "sequelize";
import db from "../config/database.js";
import Akun from "./akun.js";
import Organisasi from "./organisasi.js";
import { v4 } from "uuid";

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
    id_organisasi: {
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

Akun.hasMany(NomorSurat, { foreignKey: "id_pengirim", sourceKey: "id" });
NomorSurat.belongsTo(Akun, { foreignKey: "id_pengirim", targetKey: "id" });
Organisasi.hasMany(NomorSurat, {
  foreignKey: "id_organisasi",
  sourceKey: "id",
});
NomorSurat.belongsTo(Organisasi, {
  foreignKey: "id_organisasi",
  targetKey: "id",
});

export default NomorSurat;
