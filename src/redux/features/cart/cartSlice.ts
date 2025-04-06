import { RootState } from '@/redux/store'
import { Extra, Size } from '@prisma/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TCart = {
    id: string
    name: string
    image: string
    basePrice: number
    description?: string
    quantity?: number
    sizes?: Size
    extras?: Extra[]
}
type CartState = {
    items: TCart[]
}

let initialCartItems = localStorage.getItem('cartItems') || undefined

const initialState: CartState = {
    items: initialCartItems ? JSON.parse(initialCartItems) : [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<TCart>) => {
            const item = action.payload
            const existingItem = state.items.find((i) => i.id === item.id)
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 0) + 1;
                existingItem.sizes = item.sizes
            } else {
                state.items.push({ ...item, quantity: 1 })
            }
        },
        removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
            const items = state.items.find((i) => i.id === action.payload.id)
            if (items) {
                if (items.quantity && items.quantity > 1) {
                    state.items = state.items.filter((item) => item.id !== action.payload.id)
                    items.quantity -= 1
                } else (
                    items.quantity! -= 1
                )
            }
        },
        removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id)
        },
        clearCart: (state) => {
            state.items = []
        },
        getSubTotal: (state) => {
            state.items.reduce((acc, item) => {
                return acc + (item.basePrice * (item.quantity || 1))
            }, 0)
        }
    }
})

export const selectCartItems = (state: RootState) => state.cart.items

export const { addToCart, removeItemFromCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer