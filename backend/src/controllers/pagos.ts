import { Request, Response } from 'express'
import { Pago } from '../models/pago';

export const newPago= async( req: Request, res:Response)=>{
    const { idFactura, nombre, cedula, cancelado,total} = req.body;
    const pago = await Pago.findOne({ where: {idFactura: idFactura } })
    if (pago) {
        return res.status(400).json({
            msg: 'Por favor realice el pago de la factura' + idFactura 
        })
    }

    try {
        await Pago.create({
            idFactura:idFactura,
            nombre:nombre,
            cedula:cedula,
            cancelado:cancelado,
            total:total
        })
        res.json({
            msg: 'Porfavor realice el pago de su facturahfgh'+idFactura
        })
    } catch (error) {
    
    }

}



export const getPago = async (req: Request, res: Response)=>{
    const {idFactura}=req.query
    const pago= await Pago.findOne({where:{
        idFactura:idFactura,
       }})

    if(pago){
        res.json(pago)
    }else{
        res.status(404).json({
            msg:'No existe el pago'
        })
    }
}