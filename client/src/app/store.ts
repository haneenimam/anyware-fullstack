import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import authReducer from '../features/auth/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer
});

const persisted = persistReducer({ key: 'root', storage, whitelist: ['auth'] }, rootReducer);

export const store = configureStore({
  reducer: persisted,
  middleware: (gDM) => gDM({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      ignoredPaths: ['register']
    }
  }).concat(api.middleware)
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
