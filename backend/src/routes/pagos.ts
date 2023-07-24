import{Router} from "express"

import validateToken from "./validate_token";
import { getPago, newPago } from "../controllers/pagos";


const router= Router();

router.post('/crearPago', validateToken,newPago)
router.get('/obtenerPago',validateToken,getPago)
 
export default router;