import express from 'express'
import { 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser,
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from '../controllers/userController'
import { protect, authorize } from '../middleware/auth'

const router = express.Router()

// All routes require authentication
router.use(protect)

// User routes
router.get('/wishlist', getWishlist)
router.post('/wishlist', addToWishlist)
router.delete('/wishlist/:productId', removeFromWishlist)

// Admin routes
router.use(authorize('ADMIN'))
router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
