import db from "../config/database.js";
import { DataTypes } from "sequelize";

const Users = db.define(
  "akun",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_lengkap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organisasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jabatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // nomor_surat: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default Users;
