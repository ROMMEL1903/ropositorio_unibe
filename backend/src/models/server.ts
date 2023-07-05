
import express from 'express';
import cors from 'cors'
import routesMateria from '../routes/materias'
import { getMaterias } from '../controllers/materias';
import routesUser from '../routes/usuario'
import sequelize from '../db/connection';
import {  Materia } from './materias';
import { Usuario } from './usuario';



class Server {

    private app: express.Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConect();

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo' + this.port)
        })
    }

    routes() {
        this.app.use('/materias', routesMateria)
        this.app.use('/usuarios', routesUser)
    }

    midlewares(){


        this.app.use(express.json()); 


        this.app.use(cors())
    }

    async dbConect(){
        try{
            await Materia.sync()
            await Usuario.sync()
           
        }catch(error){
            console.log('Errooo >:( ', error)
        }
    }

}

export default Server