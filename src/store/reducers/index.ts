// third-party
import { combineReducers } from "redux";

// project import
import userReducer from "store/reducers/features/user/userSlice";
import settingReducer from "store/reducers/features/settings/settingSlice";
import invoiceReducer from "store/reducers/features/invoice/invoiceSlice";
import transactionReducer from "store/reducers/features/transaction/transactionSlice";
import exchangeReducer from "store/reducers/features/exchange/exchangeSlice";
import rateReducer from "store/reducers/features/rates/rateSlice";

import { api } from "store/api";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./jwtAuth";
// ==============================|| COMBINE REDUCERS ||============================== //

const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  setting: settingReducer,
  invoice: invoiceReducer,
  transaction: transactionReducer,
  exchange: exchangeReducer,
  rates: rateReducer,
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
