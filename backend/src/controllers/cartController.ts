import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { validationResult } from 'express-validator'

const prisma = new PrismaClient()

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id

    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true,
                isActive: true
              }
            },
            variant: {
              select: {
                id: true,
                name: true,
                price: true,
                attributes: true
              }
            }
          }
        }
      }
    })

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  images: true,
                  isActive: true
                }
              },
              variant: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  attributes: true
                }
              }
            }
          }
        }
      })
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => {
      const price = item.variant ? Number(item.variant.price) : Number(item.product.price)
      return sum + (price * item.quantity)
    }, 0)

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)

    res.json({
      success: true,
      data: {
        ...cart,
        subtotal,
        totalItems
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      })
    }

    const { productId, variantId, quantity = 1 } = req.body
    const userId = req.user!.id

    // Check if product exists and is active
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or inactive'
      })
    }

    // Check if variant exists (if provided)
    if (variantId) {
      const variant = await prisma.productVariant.findUnique({
        where: { id: variantId }
      })

      if (!variant || !variant.isActive) {
        return res.status(404).json({
          success: false,
          message: 'Product variant not found or inactive'
        })
      }
    }

    // Get or create cart
    let cart = await prisma.cart.findFirst({
      where: { userId }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId }
      })
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        variantId: variantId || null
      }
    })

    if (existingItem) {
      // Update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true
            }
          },
          variant: {
            select: {
              id: true,
              name: true,
              price: true,
              attributes: true
            }
          }
        }
      })

      return res.json({
        success: true,
        message: 'Item quantity updated in cart',
        data: updatedItem
      })
    } else {
      // Add new item
      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId: variantId || null,
          quantity
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true
            }
          },
          variant: {
            select: {
              id: true,
              name: true,
              price: true,
              attributes: true
            }
          }
        }
      })

      return res.json({
        success: true,
        message: 'Item added to cart',
        data: newItem
      })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.params
    const { quantity } = req.body
    const userId = req.user!.id

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      })
    }

    // Find cart item
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { userId }
      }
    })

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      })
    }

    // Update quantity
    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true
          }
        },
        variant: {
          select: {
            id: true,
            name: true,
            price: true,
            attributes: true
          }
        }
      }
    })

    res.json({
      success: true,
      message: 'Cart item updated',
      data: updatedItem
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemId } = req.params
    const userId = req.user!.id

    // Find cart item
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { userId }
      }
    })

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      })
    }

    // Remove item
    await prisma.cartItem.delete({
      where: { id: itemId }
    })

    res.json({
      success: true,
      message: 'Item removed from cart'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id

    // Find user's cart
    const cart = await prisma.cart.findFirst({
      where: { userId }
    })

    if (cart) {
      // Delete all cart items
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id }
      })
    }

    res.json({
      success: true,
      message: 'Cart cleared'
    })
  } catch (error) {
    next(error)
  }
}
