import en from '~/i18n'

const i18n = en.companyInformation

const businessDetails = {
  type: '',
  name: '',
  registrationNumber: '',
  sitePostcode: '',
  siteAddress: '',
}

const contactDetails = {
  businessPhoneNumber: '',
  contactName: '',
  position: '',
  postcode: '',
  address: '',
}

export const companyDetailsForm = {
  company: businessDetails,
  contact: contactDetails,
}

export type CompanyDetailsForm = typeof companyDetailsForm
export type BusinessContactDetails = typeof contactDetails
export type BusinessDetails = typeof businessDetails

export const formConfig = {
  id: 'company-details-form',
  company: {
    type: {
      id: 'company.type', // TODO enforce this ids to be unique
      defaultValue: '', // TODO remove companyDetailsForm and use defaultValue key insted
      label: i18n.companyForm.type.label,
      disabled: true,
      inputProps: {
        type: 'text',
      },
    },
    sitePostcode: {
      id: 'company.sitePostcode',
      defaultValue: '',
      label: i18n.companyForm.sitePostcode.label,
      disabled: true,
      inputProps: {
        type: 'text',
      },
    },
    siteAddress: {
      id: 'company.siteAddress',
      defaultValue: '',
      label: i18n.companyForm.siteAddress.label,
      disabled: true,
      inputProps: {
        type: 'text',
      },
    },
    name: {
      id: 'company.name',
      defaultValue: '',
      label: i18n.companyForm.businessName.label,
      disabled: true,
      inputProps: {
        type: 'text',
      },
    },
    registrationNumber: {
      id: 'company.registrationNumber',
      defaultValue: '',
      label: i18n.companyForm.registrationNumber.label,
      disabled: true,
      inputProps: {
        type: 'text',
      },
    },
  },
  contact: {
    businessPhoneNumber: {
      id: 'contact.businessPhoneNumber',
      defaultValue: '',
      label: i18n.contactForm.businessPhoneNumber.label,
      inputProps: {
        type: 'text',
      },
    },
    contactName: {
      id: 'contact.contactName',
      defaultValue: '',
      label: i18n.contactForm.contactName.label,
      inputProps: {
        type: 'text',
      },
    },
    position: {
      id: 'contact.position',
      defaultValue: '',
      label: i18n.contactForm.position.label,
      inputProps: {
        type: 'text',
      },
    },
    postcode: {
      id: 'contact.postcode',
      defaultValue: '',
      label: i18n.contactForm.postcode.label,
      inputProps: {
        type: 'text',
      },
    },
    address: {
      id: 'contact.address',
      defaultValue: '',
      label: i18n.contactForm.address.label,
      inputProps: {
        type: 'text',
      },
    },
  },
}
