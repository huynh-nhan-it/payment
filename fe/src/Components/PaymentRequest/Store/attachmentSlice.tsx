import { createSlice} from '@reduxjs/toolkit';


const initialState  = {
  selectedFile: [],
};

const attachmentSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
  },
});

export const { setSelectedFile } = attachmentSlice.actions;

export default attachmentSlice.reducer;