import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { accountSlice } from './reducers/account/accountSlice'
import { authSlice } from './reducers/auth/authSlice'
import { changeEmailSlice } from './reducers/changeEmail/changeEmailSlice'
import { changePasswordSlice } from './reducers/changePassword/changePasswordSlice'
import { contractsSlice } from './reducers/contracts/contractsSlice'
import { usageSlice } from './reducers/usage/usageSlice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    account: accountSlice.reducer,
    contracts: contractsSlice.reducer,
    usage: usageSlice.reducer,
    changeEmail: changeEmailSlice.reducer,
    changePassword: changePasswordSlice.reducer,
  },
  devTools: true,
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
export type RootState = ReturnType<typeof store.getState>

export default store
