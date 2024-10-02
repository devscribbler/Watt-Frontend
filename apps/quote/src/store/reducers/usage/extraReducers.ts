import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUsage, setUsage, SetUsagePayload } from '@watt/api-interface'
import { UtilityKindType } from '@watt/constants'
import { getProviderByIdThunk } from '../providers/extraReducers'

export const getUsageThunk = createAsyncThunk('usage/getUtilityUsage', getUsage)

export const getUsageByUtilityTypeThunk = createAsyncThunk(
  'usage/getUsageByUtilityTypeThunk',
  async (utilityType: UtilityKindType, thunkAPI) => {
    const { data, error } = await getUsage({ utilityType })

    if (!data) {
      return thunkAPI.rejectWithValue({ utilityType, error })
    }

    await thunkAPI.dispatch(getProviderByIdThunk(data.contract.provider_id))
    return {
      type: utilityType,
      data: {
        contract: data.contract,
        usage: data.usage.length > 12 ? data.usage.slice(-12) : data.usage,
      },
    }
  }
)

export const setUsageThunk = createAsyncThunk('usage/setUsageThunk', async (payload: SetUsagePayload) => {
  const data = await setUsage(payload)

  return { data }
})
