import { AnyAction, configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import tableReducer from "./tableSlice";
import calReducer from "./calculateSlice";
import approveReducer from "./approveSlice";
import attachmentReducer from "./attachmentSlice";
import departmentSlice from "../../Request/component/reducers/departmentSlice";
// import typeReducer from "./typeSlice";
export type RootState = {
  form: ReturnType<typeof formReducer>;
  table: ReturnType<typeof tableReducer>;
  approve: ReturnType<typeof approveReducer>;
  cal: ReturnType<typeof calReducer>;
  attachment: ReturnType<typeof attachmentReducer>;
  departmentSlice: ReturnType<typeof departmentSlice>;
};

export const store = configureStore({
  reducer: {
    form: formReducer,
    table: tableReducer,
    cal: calReducer,
    approve: approveReducer,
    attachment: attachmentReducer, 
    departmentSlice,   
  },
});

export type AppDispatch = typeof store.dispatch;

