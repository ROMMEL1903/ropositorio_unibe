import { DataTypes } from "sequelize"
import sequelize from "../db/connection"

export const Pago = sequelize.define('pago', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idFactura: {
        type: DataTypes.INTEGER,
        references: {
            model: 'facturas',
            key: 'id'
        } 
    },
    nombre: {
        type: DataTypes.STRING
    },
    cedula: {
        type: DataTypes.STRING
    },
    cancelado:{
         type:DataTypes.BOOLEAN
    },
    total: {
        type: DataTypes.FLOAT
    } 
}, {
    tableName: 'pagos',
    timestamps: false
})