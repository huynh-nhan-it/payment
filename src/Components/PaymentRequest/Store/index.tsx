import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
//import tableReducer from "./tableSlice";
export const store = configureStore({
    reducer: {
      form: formReducer,
      //table: tableReducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;