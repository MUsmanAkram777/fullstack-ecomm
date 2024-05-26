import express from 'express'
import { login,getProfile,registerUser, updateProfile } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login',login)
router.route('/profile').get(authMiddleware,getProfile).put(authMiddleware,updateProfile)



export default router