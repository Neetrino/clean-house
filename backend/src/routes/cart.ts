import express from 'express'
import { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} from '../controllers/cartController'
import { protect } from '../middleware/auth'

const router = express.Router()

// All routes require authentication
router.use(protect)

router.get('/', getCart)
router.post('/add', addToCart)
router.put('/:itemId', updateCartItem)
router.delete('/:itemId', removeFromCart)
router.delete('/', clearCart)

export default router
