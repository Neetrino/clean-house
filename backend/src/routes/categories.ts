import express from 'express'
import { 
  getCategories, 
  getCategory, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../controllers/categoryController'
import { protect, authorize } from '../middleware/auth'

const router = express.Router()

// Public routes
router.get('/', getCategories)
router.get('/:id', getCategory)

// Protected routes (Admin only)
router.use(protect)
router.use(authorize('ADMIN'))

router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

export default router
