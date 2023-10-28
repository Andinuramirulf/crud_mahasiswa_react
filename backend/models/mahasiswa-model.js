import { DataTypes } from 'sequelize';
import db from "../config/database.js";

const MahasiswaModel = db.define('mahasiswa', {
    name: {
        type: DataTypes.STRING,
        required: true,
    },
    nim: {
        type: DataTypes.STRING,
        required: true,
    },
    picture_path: {
        type: DataTypes.STRING,
        required: true,
    },
    major: {
        type: DataTypes.STRING,
    },
}, {
    freezeTableName: true,
});

export default MahasiswaModel;
