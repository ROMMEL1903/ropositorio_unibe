"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Materia = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Materia = connection_1.default.define('materia', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    creditos: {
        type: sequelize_1.DataTypes.INTEGER
    },
    valorCredito: {
        type: sequelize_1.DataTypes.FLOAT
    }
}, {
    tableName: 'Materias',
    timestamps: false
});
