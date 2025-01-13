// models/Image.ts
import { Model, DataTypes } from 'sequelize';
import dbStorage from '../lib/db.js';
import User from './userModel.js';

class Image extends Model {}

Image.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    UserId:{
        type: DataTypes.INTEGER,
        references:{
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: dbStorage.db,
    tableName: 'images',
});

export default Image;
