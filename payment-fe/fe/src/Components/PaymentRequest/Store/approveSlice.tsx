import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ListApproveAPI: [], // Khởi tạo mảng ListDetail là một trạng thái ban đầu
};

const approveSlice = createSlice({
  name: 'approve',
  initialState,
  reducers: {
    setListApproveAPI: (state, action) => {
      state.ListApproveAPI = action.payload; // Cập nhật mảng ListDetail với giá trị mới từ action.payload
    },
  },
});

export const { setListApproveAPI } = approveSlice.actions;

export default approveSlice.reducer;