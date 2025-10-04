import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  maxQuantity?: number
}

interface CartStore {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isInCart: (id: string) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        const { items } = get()
        const existingItem = items.find(i => i.id === item.id)
        
        if (existingItem) {
          set(state => ({
            items: state.items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          }))
        } else {
          set(state => ({
            items: [...state.items, { ...item, quantity: 1 }]
          }))
        }
        
        // Update totals
        set(state => ({
          totalItems: state.items.reduce((total, item) => total + item.quantity, 0),
          totalPrice: state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        }))
      },

      removeItem: (id) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id)
        }))
        
        // Update totals
        set(state => ({
          totalItems: state.items.reduce((total, item) => total + item.quantity, 0),
          totalPrice: state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }))
        
        // Update totals
        set(state => ({
          totalItems: state.items.reduce((total, item) => total + item.quantity, 0),
          totalPrice: state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        }))
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 })
      },

      isInCart: (id) => {
        return get().items.some(item => item.id === id)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
)
