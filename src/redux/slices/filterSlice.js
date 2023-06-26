import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSortType(state, action) {
        state.sort = action.payload
    },
    setFilters(state, action) {
      state.categoryId = action.payload.categoryId;
      state.sort = action.payload.sort
    }
  },
})

export const { setCategoryId, setSortType, setFilters } = filterSlice.actions

export default filterSlice.reducer