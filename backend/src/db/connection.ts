import {Sequelize} from "sequelize"

const sequelize= new Sequelize('app_pagos','root','password',{
    host:'localhost',
    dialect:"mysql"
})

export default sequelize