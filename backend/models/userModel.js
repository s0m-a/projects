// models/User.ts
import { Model, DataTypes } from 'sequelize';
import dbStorage from '../lib/db.js';

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize : dbStorage.db,
    tableName: 'users',
});

export default User;
