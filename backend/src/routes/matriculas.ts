import{Router} from "express"

import validateToken from "./validate_token";
import { deletMatricula, getMatricula, getMatriculas, newMatricula, updateMatricula } from "../controllers/matriculas";


const router= Router();


router.post('/crearMatricula', validateToken,newMatricula)
router.get('/listaMatriculas', validateToken,getMatriculas)
router.put('/editarMatricula/:id', validateToken, updateMatricula)
router.get('/:id', validateToken, getMatricula )
router.delete('/:id',validateToken,deletMatricula)
export default router;