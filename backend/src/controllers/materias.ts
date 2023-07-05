import {Request, Response} from 'express'
import { Materia } from '../models/materias'

 export const getMaterias = async (req:Request, res: Response) =>{
    const listaMaterias=  await Materia.findAll();
    res.json(listaMaterias)

}