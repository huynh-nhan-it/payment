// store.ts

import { createStore, combineReducers } from "redux";
import filterReducer from "./reducers/filterReducer";

// Khởi tạo state gốc
const rootReducer = combineReducers({
  filter: filterReducer,
});

// Tạo Redux store
const store = createStore(rootReducer);
// store.ts

export type RootState = ReturnType<typeof rootReducer>;

export default store;
