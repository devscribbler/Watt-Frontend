import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProviderById, getProvidersByUtilityType } from '@watt/api-interface'
import { UtilityKindType } from '@watt/constants'

export const getProviderByIdThunk = createAsyncThunk('providers/getProviderById', async (id: string) =>
  getProviderById(id)
)

export const getProvidersByUtilityTypeThunk = createAsyncThunk(
  'providers/getProvidersByUtilityType',
  async (utility_type: UtilityKindType) => getProvidersByUtilityType(utility_type)
)
