import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NOT_QUOTABLE_ERROR_CODE, UtilityKindType } from '@watt/constants';
import { getUsageByUtilityTypeThunk } from '../usage/extraReducers';

export interface FormState {
  selectedUtilities: UtilityKindType[]
  notQuotableUtilities: NotQuotableUtility[]
  currentFlow?: UtilityKindType
}

const initialState: FormState = {
  selectedUtilities: [],
  notQuotableUtilities: [],
  currentFlow: undefined,
}

type NotQuotableUtility = {
  utility: UtilityKindType,
  reason: string
}

type SetSelectedUtilitiesPayload = {
  selectedUtilities: UtilityKindType[]
}

type SetCurrentFlowPayload = {
  flow: UtilityKindType
}

export type GetUsageByUtilityTypeThunkRejectedPayload = {
  utilityType: UtilityKindType,
  code: string,
  message: string
}

function sortUtilities(utilities: UtilityKindType[]) {
  return utilities.sort((a, b) => {
    return a - b
  })
}

export const formSlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setSelectedUtilities(state, action: PayloadAction<SetSelectedUtilitiesPayload>) {
      state.selectedUtilities = action.payload.selectedUtilities
      state.selectedUtilities = sortUtilities(action.payload.selectedUtilities)
    },
    setCurrentFlow(state, action: PayloadAction<SetCurrentFlowPayload>) {
      state.currentFlow = action.payload.flow
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsageByUtilityTypeThunk.rejected, (state, action) => {
        const { utilityType, code, message } = action.payload as GetUsageByUtilityTypeThunkRejectedPayload
        if (code === NOT_QUOTABLE_ERROR_CODE) {
          state.notQuotableUtilities = [...state.notQuotableUtilities, {
            utility: utilityType,
            reason: message
          }]
        }
      })
  }
})

export const { setSelectedUtilities, setCurrentFlow } = formSlice.actions
