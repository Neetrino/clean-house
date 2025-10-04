import express from 'express'
import { 
  getDashboardStats,
  getRecentOrders,
  getTopProducts,
  getSalesReport
} from '../controllers/adminController'
import { protect, authorize } from '../middleware/auth'

const router = express.Router()

// All routes require admin authentication
router.use(protect)
router.use(authorize('ADMIN'))

router.get('/dashboard', getDashboardStats)
router.get('/recent-orders', getRecentOrders)
router.get('/top-products', getTopProducts)
router.get('/sales-report', getSalesReport)

export default router
