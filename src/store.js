import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import tenderReducer from './slices/tenderSlice';
import userReducer from './slices/userSlice';
import saleCalenderReducer from './slices/saleCalenderSlice';
import communityReducer from './slices/communitySlice';
import { persistStore,persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import snackbarReducer from './slices/snackbarSlice';
import authReducer from './slices/authSlice';
import sidebarReducer from './slices/sidebarSlice';
import postalReducer from './slices/pincodeSlice';
import dashboardReducer from './slices/dashboardSlice';

const persistConfig = {
    key: 'root',
    storage,
  };
  
const persistedReducer = persistReducer(persistConfig, tenderReducer);
const persistedUser = persistReducer(persistConfig, userReducer);
const persistedCommunity = persistReducer(persistConfig, communityReducer);

export const store = configureStore({
    reducer:{
        tenders: persistedReducer,
        users: persistedUser,
        saleCalendar: saleCalenderReducer,
        community:persistedCommunity,
        snackbar:snackbarReducer,
        auth:authReducer,
        sidebar:sidebarReducer,
        postal:postalReducer,
        dashboard:dashboardReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:{
        ignoreActions:[]
    }}).concat(thunk),

})

export const persistor = persistStore(store);