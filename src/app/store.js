import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './features/userSlice';
import deliveryAddressReducer from './features/deliveryAddressSlice';
import productsReducer from './features/productsSlice';

const productsPersistConfig = {
  key: 'product',
  storage,
  blacklist: ['category', 'skip', 'tags'],
  version: 1,
};

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['product'],
  version: 1,
};

const rootReducer = combineReducers({
  user: userReducer,
  deliveryAddress: deliveryAddressReducer,
  product: persistReducer(productsPersistConfig, productsReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: ProcessingInstruction.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
