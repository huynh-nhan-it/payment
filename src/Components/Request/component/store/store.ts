// store.ts

import { createStore, combineReducers } from "redux";
import filterReducer from "../reducers/filterReducer";
import searchReducer from "../reducers/searchReducer";
import navbarReducer from "../reducers/navbarReducer";

// Khởi tạo state gốc
const rootReducer = combineReducers({
  filter: filterReducer,
  search: searchReducer,
  key: navbarReducer
});

// Tạo Redux store
const store = createStore(rootReducer);
// store.ts

export type RootState = ReturnType<typeof rootReducer>;

export default store;
