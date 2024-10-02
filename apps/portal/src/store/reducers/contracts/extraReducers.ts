import { createAsyncThunk } from '@reduxjs/toolkit'
import 'core-js/features/promise'
import {
  axios,
  getAllContracts,
  getContractProviderById,
  getQuoteByUtilityType,
  GetQuoteByUtilityTypeResponse,
} from '@watt/api-interface'
import { UTILITIES_NOT_AVAILABLE, UtilityKindType, UTILITY_TYPES } from '@watt/constants'
import { cfg } from '~/config/config'
import { downloadObject } from '~/utils/file'

const getQuotesForAvailableUtilities = async () => {
  const availableUtilities = Object.keys(UTILITY_TYPES).filter((utility) => {
    const parsedUtility = Number(utility) as unknown as UtilityKindType

    return !UTILITIES_NOT_AVAILABLE.includes(parsedUtility)
  })
  const promises = availableUtilities.map((utility) => getQuoteByUtilityType(utility as unknown as UtilityKindType))
  const settledPromises = await Promise.allSettled(promises)
  const resolvedPromises = settledPromises
    .filter((promise) => promise.status === 'fulfilled')
    .map((p) => {
      // @ts-expect-error value is not defined
      return p.value as unknown as GetQuoteByUtilityTypeResponse
    })

  return resolvedPromises
}

export const getAllContractsWithProvidersThunk = createAsyncThunk('account/getAllContracts', async () => {
  const contracts = await getAllContracts()
  const providersIds: string[] = contracts.map(({ quote }) => quote.provider_id)
  const providerPromises = providersIds.map((id) => getContractProviderById(id))
  const providers = await Promise.all(providerPromises)
  const quotes = await getQuotesForAvailableUtilities()

  const result = contracts.map((contract, index) => {
    const quote = quotes.length
      ? quotes.filter((quote) => {
          return quote.utility_type === contract.utility_type
        })[0]
      : null

    return {
      contract,
      provider: providers[index],
      quote,
    }
  })

  return result
})

export const getAllContractsThunk = createAsyncThunk('account/getAllContracts', getAllContracts)

export const getContractPDFByIdThunk = createAsyncThunk('account/getContractPDF', async (contractId: string) => {
  const {
    data: { url },
  } = await axios.get(`${cfg.api.routes.getContractPDF}/${contractId}/pdf`)

  const { data } = await axios.get(url, { responseType: 'blob' })

  // TODO discuss with Dani if we need to remove this
  return downloadObject(data, `Watt - ${contractId}.pdf`)
})
