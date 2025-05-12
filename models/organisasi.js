import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Organisasi = db.define(
  "organisasi",
  {
    id_organisasi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_organisasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jabatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_surat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_jenis_surat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    periode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    periode_dimulai: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps:false,
  }
);

export default Organisasi;