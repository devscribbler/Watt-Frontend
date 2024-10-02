import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { bankingSlice } from './reducers/banking/bankingSlice';
import { cartSlice } from './reducers/cart/cartSlice';
import { companySlice } from './reducers/company/companySlice';
import { contractsSlice } from './reducers/contracts/contractsSlice';
import { formSlice } from './reducers/form/formSlice';
import { providersSlice } from './reducers/providers/providersSlice';
import { quotesSlice } from './reducers/quotes/quotesSlice';
import { usageSlice } from './reducers/usage/usageSlice';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['cart', 'form', 'banking', 'company', 'contracts', 'providers', 'quotes', 'usage'],
}

const reducer = combineReducers({
  cart: cartSlice.reducer,
  form: formSlice.reducer,
  banking: bankingSlice.reducer,
  company: companySlice.reducer,
  contracts: contractsSlice.reducer,
  providers: providersSlice.reducer,
  quotes: quotesSlice.reducer,
  usage: usageSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);
export default store
