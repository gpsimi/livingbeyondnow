import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/payload-types'

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
  isAddModalOpen: boolean
  lastAddedProduct: Product | null
  
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  
  setCartOpen: (isOpen: boolean) => void
  setAddModalOpen: (isOpen: boolean, product?: Product) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      isAddModalOpen: false,
      lastAddedProduct: null,

      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id)
        if (existingItem) {
           return {
             items: state.items.map(item => 
               item.id === product.id 
                 ? { ...item, quantity: item.quantity + 1 }
                 : item
             )
           }
        }
        return { items: [...state.items, { ...product, quantity: 1 }] }
      }),
      
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
      })),

      clearCart: () => set({ items: [] }),

      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      
      setAddModalOpen: (isOpen, product) => set((state) => ({ 
        isAddModalOpen: isOpen,
        lastAddedProduct: product !== undefined ? product : state.lastAddedProduct
      })),

    }),
    {
      name: 'prime-cart-storage',
    }
  )
)
