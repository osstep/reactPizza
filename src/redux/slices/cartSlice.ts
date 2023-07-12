import { createSlice } from '@reduxjs/toolkit'

interface CartSliceItem {
    id: number
    title: string
    price: number
    imgUrl: string
    type: number,
    size: number,
    count: number
}

interface CartSliceState {
  categoryId: number,
  items: CartSliceItem[],
  totalPrice: number,
  totalItems: number,
}

const initialState: CartSliceState = {
  categoryId: 0,
  items: [],
  totalPrice: 0,
  totalItems: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // метод добавления товара в корзину
    addItemToCart(state, action) {
      const item = state.items.findIndex(
        (obj) =>
          JSON.stringify({ ...obj, count: 0 }) ==
          JSON.stringify({ ...action.payload, count: 0 })
      )
      console.log(item)
      if (item != -1) {
        state.items[item].count++
      } else {
        state.items.push(action.payload)
      }
      state.totalPrice = state.items.reduce((acc, obj) => {
        return acc + obj.price * obj.count
      }, 0)
      state.totalItems = state.items.reduce((acc, obj) => {
        return acc + obj.count
      }, 0)
    },
    // уменьшения количества товаров в корзине
    removeAmount(state, action) {
      const itemId = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === itemId)

      if (itemIndex !== -1) {
        const item = state.items[itemIndex]

        if (item.count > 1) {
          state.items[itemIndex].count--
        } else {
          state.items = state.items.filter((item) => item.id !== itemId)
        }
      }

      state.totalPrice = state.items.reduce((acc, obj) => {
        return acc + obj.price * obj.count
      }, 0)
      state.totalItems = state.items.reduce((acc, obj) => {
        return acc + obj.count
      }, 0)
    },
    // увеличение количества товаров в корзине
    addAmount(state, action) {
      const itemId = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === itemId)

      state.items[itemIndex].count++

      state.totalPrice = state.items.reduce((acc, obj) => {
        return acc + obj.price * obj.count
      }, 0)
      state.totalItems = state.items.reduce((acc, obj) => {
        return acc + obj.count
      }, 0)
    },
    // удаление товара в корзине
    removeItem(state, action) {
      const itemId = action.payload
      state.items = state.items.filter((item) => item.id !== itemId)
      state.totalPrice = state.items.reduce((acc, obj) => {
        return acc + obj.price * obj.count
      }, 0)
      state.totalItems = state.items.reduce((acc, obj) => {
        return acc + obj.count
      }, 0)
    },
    // очистка корзины
    clearCart(state) {
      state.items = []
      state.totalPrice = 0
      state.totalItems = 0
    },
  },
})

export const { addItemToCart, removeAmount, addAmount, removeItem, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
