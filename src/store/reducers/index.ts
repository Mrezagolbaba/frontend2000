// third-party
import { combineReducers } from "redux";

// project import
import userReducer from "store/reducers/features/user/userSlice";

import { api } from "store/api";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./jwtAuth";
// ==============================|| COMBINE REDUCERS ||============================== //

const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  [api.reducerPath]: api.reducer,
});

//persist reducers
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const reducers = persistReducer(persistConfig, rootReducers);

export default reducers;
