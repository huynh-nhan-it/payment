import { AnyAction, configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import tableReducer from "./tableSlice";
import calReducer from "./calculateSlice";
import approveReducer from "./approveSlice";
import typeReducer from "./typeSlice";
export type RootState = {
  form: ReturnType<typeof formReducer>;
  table: ReturnType<typeof tableReducer>;
  approve: ReturnType<typeof approveReducer>;
  cal: ReturnType<typeof calReducer>;
  type: ReturnType<typeof typeReducer>;
};

export const store = configureStore({
  reducer: {
    form: formReducer,
    table: tableReducer,
    cal: calReducer,
    approve: approveReducer,
    type: typeReducer,
    
  },
});

export type AppDispatch = typeof store.dispatch;

