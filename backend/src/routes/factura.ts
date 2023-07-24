import{Router} from "express"
import validateToken from "./validate_token";
import {FacturaApagar, FacturasEstudiane, FacturasEstudianePendientes, confirmarTransaccion, deleteFactura, getFacturasPagadasByIdRazon, newFactura } from "../controllers/factura";



const router= Router();


router.post('/crearfactura', validateToken,newFactura)
router.get('/misFacturas',validateToken, FacturasEstudiane)
router.get('/misFacturasPendientes',validateToken, FacturasEstudianePendientes)
router.get('/pagarFactura',validateToken, FacturaApagar)  
router.post('/confirmarPago',validateToken,confirmarTransaccion)
router.delete('/eliminar',validateToken,deleteFactura)
router.get('/verificarfactura',validateToken,getFacturasPagadasByIdRazon)




export default router;