import express from 'express'
import { register, login, logout, getProfile, updateProfile } from '../controllers/authController'
import { protect } from '../middleware/auth'

const router = express.Router()

// Public routes
router.post('/register', register)
router.post('/login', login)

// Protected routes
router.use(protect)
router.post('/logout', logout)
router.get('/profile', getProfile)
router.put('/profile', updateProfile)

export default router
