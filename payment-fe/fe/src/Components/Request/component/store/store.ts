// store.ts

import { createStore, combineReducers, applyMiddleware } from "redux";
import filterReducer from "../reducers/filterReducer";
import searchReducer from "../reducers/searchReducer";
import navbarReducer from "../reducers/navbarReducer";
import departmentSlice from "../reducers/departmentSlice";
import reduxThunk from 'redux-thunk'


// Khởi tạo state gốc
const rootReducer = combineReducers({
  filter: filterReducer,
  search: searchReducer,
  key: navbarReducer, 
  departmentSlice,
});

// Tạo Redux store
const store = createStore(rootReducer, applyMiddleware(reduxThunk));
// store.ts

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
