import { DataTypes } from "sequelize"
import sequelize from "../db/connection"

export const Materia = sequelize.define('materia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    creditos: {
        type: DataTypes.INTEGER
    },
    valorCredito:{
        type: DataTypes.FLOAT
    }
},{
    tableName:'Materias',
    timestamps:false
})