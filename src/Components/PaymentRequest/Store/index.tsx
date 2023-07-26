import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import tableReducer from "./tableSlice";
import calReducer from "./calculateSlice";
export const store = configureStore({
    reducer: {
      form: formReducer,
      table: tableReducer,
      cal: calReducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;