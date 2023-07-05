import{Router} from "express"
import{getMaterias} from '../controllers/materias'
import validateToken from "./validate_token";


const router= Router();

router.get('/', validateToken,getMaterias)


export default router;