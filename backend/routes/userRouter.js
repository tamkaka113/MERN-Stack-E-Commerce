import express from 'express'
const router = express.Router()
import {login,register,getUserProfile} from '../controllers/userController.js'
import {protect} from '../middleware/authMiddleware.js'
router.post('/login', login)
router.post('/register', register)
router.route('/profile').get(protect, getUserProfile)

export default router