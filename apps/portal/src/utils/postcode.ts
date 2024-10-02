import { nanoid } from 'nanoid'
import { axios } from '@watt/api-interface'
import { POST_CODE_REGEX_WITH_SPECIAL_CASES } from '@watt/constants'
import { cfg } from '~/config/config'
import en from '~/i18n'

export const isValidPostcode = (postcode: string): boolean => POST_CODE_REGEX_WITH_SPECIAL_CASES.test(postcode)

interface IndividualResponseAddress {
  address: string
  mpan_key: string[]
}

export type GetAddressByPostcodeResponse = IndividualResponseAddress[]

export type FindAddressByPostcode = {
  id: string
  address: string
  mpan_key: string[]
}

export async function findAddressesByPostcode(postcode: string): Promise<FindAddressByPostcode[]> {
  if (isValidPostcode(postcode)) {
    const url = `${cfg.api.routes.postcode}?postcode=${encodeURI(postcode)}`
    const { data } = await axios.get<GetAddressByPostcodeResponse>(url, { withCredentials: true })

    // TODO (DC): should be the same as the `quote/.../postcode.ts one`?
    return data.map(({ address, mpan_key }) => {
      return {
        id: nanoid(5),
        address,
        mpan_key,
      }
    })
  }

  throw new Error(en.errors.invalidPostcode)
}
