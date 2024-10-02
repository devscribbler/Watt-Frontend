import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  setDirectDebitAccountInfo,
  SetDirectDebitAccountInfoPayload,
  getDirectDebitAccountInfo,
} from '@watt/api-interface'

export const setDirectDebitAccountInfoThunk = createAsyncThunk(
  'banking/setDirectDebitAccountInfoThunk',
  async (payload: SetDirectDebitAccountInfoPayload) => {
    const data = await setDirectDebitAccountInfo(payload)

    return { data }
  }
)

export const getDirectDebitAccountInfoThunk = createAsyncThunk('banking/getDirectDebitAccountInfoThunk', async () => {
  const data = await getDirectDebitAccountInfo()

  return { data }
})
