import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { addOrder } from '../controllers/orderController.js'

const router = express.Router()

router.route('/').post(authMiddleware,addOrder)


export default router