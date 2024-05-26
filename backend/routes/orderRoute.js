import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { addOrder,getOrderById,getAllOrderByUser } from '../controllers/orderController.js'

const router = express.Router()

router.route('/').post(authMiddleware,addOrder)
router.route('/myorders').get(authMiddleware,getAllOrderByUser)
router.route('/:id').get(authMiddleware,getOrderById)

export default router