import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { period = '30d' } = req.query

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Get statistics
    const [
      totalUsers,
      totalOrders,
      totalProducts,
      totalRevenue,
      recentUsers,
      recentOrders,
      topProducts,
      orderStats
    ] = await Promise.all([
      // Total users
      prisma.user.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),
      
      // Total orders
      prisma.order.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),
      
      // Total products
      prisma.product.count({
        where: { isActive: true }
      }),
      
      // Total revenue
      prisma.order.aggregate({
        where: {
          createdAt: { gte: startDate },
          paymentStatus: 'PAID'
        },
        _sum: { total: true }
      }),
      
      // Recent users
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      }),
      
      // Recent orders
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      
      // Top products
      prisma.product.findMany({
        take: 5,
        where: { isActive: true },
        include: {
          _count: {
            select: {
              orderItems: true
            }
          }
        },
        orderBy: {
          orderItems: {
            _count: 'desc'
          }
        }
      }),
      
      // Order status distribution
      prisma.order.groupBy({
        by: ['status'],
        where: {
          createdAt: { gte: startDate }
        },
        _count: { status: true }
      })
    ])

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalOrders,
          totalProducts,
          totalRevenue: totalRevenue._sum.total || 0
        },
        recentUsers,
        recentOrders,
        topProducts,
        orderStats
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get recent orders
// @route   GET /api/admin/recent-orders
// @access  Private/Admin
export const getRecentOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 10, status } = req.query

    const where: any = {}
    if (status) {
      where.status = status
    }

    const orders = await prisma.order.findMany({
      where,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true
              }
            }
          }
        }
      }
    })

    res.json({
      success: true,
      data: orders
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get top products
// @route   GET /api/admin/top-products
// @access  Private/Admin
export const getTopProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 10, period = '30d' } = req.query

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        orderItems: {
          some: {
            order: {
              createdAt: { gte: startDate }
            }
          }
        }
      },
      take: Number(limit),
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        },
        _count: {
          select: {
            orderItems: {
              where: {
                order: {
                  createdAt: { gte: startDate }
                }
              }
            }
          }
        }
      },
      orderBy: {
        orderItems: {
          _count: 'desc'
        }
      }
    })

    res.json({
      success: true,
      data: products
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get sales report
// @route   GET /api/admin/sales-report
// @access  Private/Admin
export const getSalesReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { period = '30d', groupBy = 'day' } = req.query

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Get sales data
    const salesData = await prisma.order.findMany({
      where: {
        createdAt: { gte: startDate },
        paymentStatus: 'PAID'
      },
      select: {
        total: true,
        createdAt: true,
        status: true
      },
      orderBy: { createdAt: 'asc' }
    })

    // Group data by period
    const groupedData: { [key: string]: { total: number; count: number } } = {}
    
    salesData.forEach(order => {
      let key: string
      
      if (groupBy === 'day') {
        key = order.createdAt.toISOString().split('T')[0]
      } else if (groupBy === 'week') {
        const week = Math.ceil(order.createdAt.getDate() / 7)
        key = `${order.createdAt.getFullYear()}-W${week}`
      } else if (groupBy === 'month') {
        key = `${order.createdAt.getFullYear()}-${String(order.createdAt.getMonth() + 1).padStart(2, '0')}`
      } else {
        key = order.createdAt.toISOString().split('T')[0]
      }
      
      if (!groupedData[key]) {
        groupedData[key] = { total: 0, count: 0 }
      }
      
      groupedData[key].total += Number(order.total)
      groupedData[key].count += 1
    })

    // Convert to array format
    const reportData = Object.entries(groupedData).map(([date, data]) => ({
      date,
      total: data.total,
      count: data.count
    }))

    // Calculate totals
    const totalRevenue = reportData.reduce((sum, item) => sum + item.total, 0)
    const totalOrders = reportData.reduce((sum, item) => sum + item.count, 0)
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    res.json({
      success: true,
      data: {
        reportData,
        summary: {
          totalRevenue,
          totalOrders,
          averageOrderValue
        }
      }
    })
  } catch (error) {
    next(error)
  }
}
