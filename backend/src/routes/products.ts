import express from 'express'
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  searchProducts,
  getFeaturedProducts
} from '../controllers/productController'
import { protect, authorize } from '../middleware/auth'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/search', searchProducts)
router.get('/featured', getFeaturedProducts)
router.get('/:id', getProduct)

// Protected routes (Admin only)
router.use(protect)
router.use(authorize('ADMIN'))

router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
