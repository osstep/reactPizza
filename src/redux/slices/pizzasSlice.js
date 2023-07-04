import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// First, create the thunk
export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { categoryId, sortType, searchValue } = params
    const res = await axios.get(
      'https://648dea102de8d0ea11e8608a.mockapi.io/items?category=' +
        `${!categoryId ? '' : categoryId}&sortBy=${
          sortType.sortProperty
        }&search=${searchValue ? searchValue : ''}`
    )
    return res.data
  }
)

const initialState = {
  items: [],
  status: 'loading' // loading || succes || error
}

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error'
      state.items = []
    })
  },
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
