import express from 'express'
import { 
  getOrders, 
  getOrder, 
  createOrder, 
  updateOrderStatus,
  cancelOrder 
} from '../controllers/orderController'
import { protect, authorize } from '../middleware/auth'

const router = express.Router()

// All routes require authentication
router.use(protect)

// Customer routes
router.get('/', getOrders)
router.get('/:id', getOrder)
router.post('/', createOrder)
router.put('/:id/cancel', cancelOrder)

// Admin routes
router.use(authorize('ADMIN'))
router.put('/:id/status', updateOrderStatus)

export default router
