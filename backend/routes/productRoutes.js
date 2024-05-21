import express from 'express'
import { getroductById,getroducts } from '../controllers/productController.js'



const router = express.Router()

router.route('/').get(getroducts)
router.route('/:id').get(getroductById) 

export default router
