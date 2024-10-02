import { createAsyncThunk } from '@reduxjs/toolkit'
import { getContractById, getContractPDFData, getContractsByUtilityType, signContractById } from '@watt/api-interface'
import { UtilityKindType } from '@watt/constants'

// const baseUrl = process.env.NEXT_PUBLIC_API_URL

type GetContractPayload = {
  utilityType: UtilityKindType
  contractId: string
}

export const getContractByIdThunk = createAsyncThunk(
  'contracts/getContractByIdThunk',
  async (payload: GetContractPayload) => {
    const { contractId, utilityType } = payload

    const contract = await getContractById(contractId)

    const ELECTRICITY_UTILITY_TYPE = 1
    if (utilityType === ELECTRICITY_UTILITY_TYPE) {
      return {
        contract,
        selectedQuote: contract.quote,
        utilityType,
      }
    }

    throw new Error('Unsupported utility type')
  }
)

export type GetContractsByUtilityTypePayload = {
  utilityType: UtilityKindType
  contractId?: string
}

export const getContractsByUtilityTypeThunk = createAsyncThunk(
  'contracts/getContractsByUtilityType',
  async ({ utilityType, contractId }: GetContractsByUtilityTypePayload) => {
    const contracts = await getContractsByUtilityType({ utilityType, contractId })

    if (contracts.length === 1) {
      const contract = contracts[0]
      const { pdfUrl } = await getContractPDFData(contract.id)

      return {
        contract: {
          ...contract,
          // TODO remove this from here - make the PDFViewer construct this URL itself.
          pdfUrl,
        },
        utilityType,
      }
    }

    throw new Error('Error in getting the contract')
  }
)

// (maks) TODO: get type from api caller file, currently its declared twice
type SignContractPayload = {
  contractId: string
  signature: string
  comments?: string
}

export const signContractByIdThunk = createAsyncThunk(
  'contracts/signContractById',
  async (payload: SignContractPayload) => {
    const { contractId, signature, comments } = payload
    const contract = await signContractById({ contractId, signature, comments })
    const { pdfUrl } = await getContractPDFData(contract.id)
    return { contract: { ...contract, pdfUrl } }
  }
)
