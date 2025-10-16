import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
//   selectedCategoryId: number | null;
}

const initialState: CategoryState = {
//   selectedCategoryId: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<number | null>) {
    //   state.selectedCategoryId = action.payload;
    },
  },
});

export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
