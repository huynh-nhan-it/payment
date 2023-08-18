import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ListDetailAPI: [], // Khởi tạo mảng ListDetail là một trạng thái ban đầu
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setListDetailAPI: (state, action) => {
      state.ListDetailAPI = action.payload; // Cập nhật mảng ListDetail với giá trị mới từ action.payload
    },
  },
});

export const { setListDetailAPI } = tableSlice.actions;

export default tableSlice.reducer;