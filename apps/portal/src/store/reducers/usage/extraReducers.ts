import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUsage } from '@watt/api-interface'

export const getUsageThunk = createAsyncThunk('usage/getUtilityUsage', getUsage)
