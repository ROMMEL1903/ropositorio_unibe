import { Request, Response, json } from 'express'
import bcrypt from 'bcrypt';
import { Usuario } from '../models/usuario';
import jwt from 'jsonwebtoken'

export const newUser = async (req: Request, res: Response) => {
    const { cedula, nombres, rol, escuela, correo, clave, primer_Inicio } = req.body;
    const encriptada = await bcrypt.hash(clave, 10)
    const usuario = await Usuario.findOne({ where: { cedula: cedula } })
    if (usuario) {
        return res.status(400).json({
            msg: 'El usuario ' + cedula + ' ya existe'
        })
    }
    try {
        await Usuario.create({
            cedula: cedula,
            nombres: nombres,
            rol: rol,
            escuela: escuela,
            correo: correo,
            clave: encriptada,
            primer_Inicio: primer_Inicio
        })
        res.json({
            msg: 'usuario ' + correo + ' creado'
        })
    } catch (error) {
        res.status(400).json({

            msg: 'Upss ocurrio un error',
            error

        })
    }
}

export const loginUser = async (req: Request, res: Response) => {

    const { correo, clave } = req.body;
    const user:any = await Usuario.findOne({ where: { correo: correo } })
    if (!user) {
        return res.status(400).json({
            msg: 'El usuario ' + correo + ' no existe'
        })
    }
   const claveCorrecta= await  bcrypt.compare(clave, user.clave)
   console.log(claveCorrecta)
   if(!claveCorrecta){
    return res.status(400).json({
        msg: 'Clave incorrecta'
    })
   }

   const token= jwt.sign({
    correo: correo
   },process.env.CLAVE_SECRETA || 'GmRawg14');

   res.json(token)
}