import { CompanyDetailsForm } from '~/features/companyInfo/formConfig'
import { GetContactDetailsResponse } from './extraReducers'

type SerializedGetContactDetailsResponse = {
  contact: {
    businessPhoneNumber: string
    contactName: string
    position: string
    emailAddress: string
  }
}

export function serializeContactDetailsResponse(data: GetContactDetailsResponse): SerializedGetContactDetailsResponse {
  return {
    contact: {
      businessPhoneNumber: data.phone,
      contactName: data.name,
      position: data.position,
      emailAddress: data.email,
    },
  }
}

export interface SetCompanyDetailsPayload {
  site: {
    address: string
    postcode: string
  }
  contact: Contact
}

interface Contact {
  phone: string
  name: string
  position: string
}

export function serializeSetCompanyDetailsRequest(data: CompanyDetailsForm): SetCompanyDetailsPayload {
  return {
    contact: {
      name: data.contact.contactName,
      phone: data.contact.businessPhoneNumber,
      position: data.contact.position,
    },
    site: { address: data.contact.address, postcode: data.contact.postcode },
  }
}
