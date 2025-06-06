import db from "../config/database.js";
import { DataTypes } from "sequelize";
import Organisasi from "./organisasi.js";
import { v4 } from "uuid";

const Akun = db.define(
  "akun",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: v4(),
      allowNull: false,
      primaryKey: true,
    },
    id_organisasi: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_lengkap: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    jabatan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Organisasi.hasMany(Akun, { foreignKey: 'id_organisasi', sourceKey: 'id' });
Akun.belongsTo(Organisasi, { foreignKey: 'id_organisasi', targetKey: 'id' });


export default Akun;
