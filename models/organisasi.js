import { DataTypes } from "sequelize";
import db from "../config/database.js";
import { v4 } from "uuid";

const Organisasi = db.define(
  "organisasi",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: v4(),
      allowNull: false,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    kode_divisi: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    divisi: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    kode_jenis_surat: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    jenis_surat: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    format_nomor_surat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    periode: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    periode_dimulai: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps:false,
  }
);

export default Organisasi;