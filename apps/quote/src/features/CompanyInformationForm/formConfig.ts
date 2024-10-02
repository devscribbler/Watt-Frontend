import en from '~/i18n'

const i18n = en.companyInformation

// MISSING TYPE slightly different to CompanyDto
const businessDetailsDefaultValues = {
  type: '', // TODO(Olly) Update this to be a BusinessType enum #782
  name: '',
  registrationNumber: '',
  charityNumber: '',
  sitePostcode: '',
  siteAddress: '',
  mpanKey: '',
  mprnKey: '',
  soletraderPersonalDetails: {
    dateOfBirth: null,
    addresses: [
      {
        address: '',
        postcode: '',
        moved_in_at: new Date().toISOString(),
        moved_out_at: '',
      },
    ],
  },
}

const contactDetailsDefaultValues = {
  businessPhoneNumber: '',
  contactEmail: '',
  contactForename: '',
  contactSurname: '',
  position: '',
  postcode: '',
  address: '',
  addressSameAsSite: true,
  mpanKey: '',
  mprnKey: '',
  // email verification
  code: '',
  verifiedEmail: false,
}

const agreementSetDefaultValues = {
  authorized: false,
  creditCheck: false,
  letterOfAuthority: false,
  termsAndConditions: false,
  smartMeterAgreement: false,
  directDebitAgreement: false,
}

export const companyDetailsFormDefaultValues = {
  company: businessDetailsDefaultValues,
  contact: contactDetailsDefaultValues,
  agreementSet: agreementSetDefaultValues,
}

export type CompanyDetailsForm = typeof companyDetailsFormDefaultValues
export type BusinessContactDetails = typeof contactDetailsDefaultValues
export type BusinessDetails = typeof businessDetailsDefaultValues
export type BusinessAgreements = typeof agreementSetDefaultValues

export type PrefillableFormFields = {
  company: Exclude<BusinessDetails, 'mpanKey' | 'mprnKey' | 'soletraderPersonalDetails'>
} & { contact: Exclude<BusinessContactDetails, 'mpanKey' | 'mprnKey' | 'code' | 'contactEmail'> }

export const formConfig = {
  id: 'company-details-form',
  company: {
    type: {
      id: 'company.type' as const, // TODO enforce this ids to be unique
      defaultValue: '', // TODO remove companyDetailsForm and use defaultValue key insted
      label: i18n.companyForm.type.label,
      disabled: false,
      inputProps: {
        type: 'text',
      },
    },
    sitePostcode: {
      id: 'company.sitePostcode' as const,
      defaultValue: '',
      label: i18n.companyForm.sitePostcode.label,
      disabled: false,
      inputProps: {
        type: 'text',
      },
    },
    siteAddress: {
      id: 'company.siteAddress' as const,
      defaultValue: '',
      label: i18n.companyForm.siteAddress.label,
      disabled: false,
      inputProps: {
        type: 'text',
      },
    },
    name: {
      id: 'company.name' as const,
      defaultValue: '',
      label: i18n.companyForm.businessName.label,
      disabled: false,
      inputProps: {
        type: 'text',
      },
    },
    registrationNumber: {
      id: 'company.registrationNumber' as const,
      defaultValue: '',
      label: i18n.companyForm.registrationNumber.label,
      disabled: false,
      inputProps: {
        type: 'text',
      },
    },
    charityNumber: {
      id: 'company.charityNumber' as const,
      defaultValue: '',
      label: i18n.companyForm.charityNumber.label,
      inputProps: {
        type: 'text',
      },
    },
    soletraderPersonalDetails: {
      id: 'company.soletraderPersonalDetails' as const,
      defaultValue: [
        {
          dateOfBirth: null,
          addresses: [
            {
              address: '',
              postcode: '',
              moved_in_at: new Date().toISOString(),
              moved_out_at: '',
            },
          ],
        },
      ],
      label: 'i18n.companyForm.soleTraderAddresses.label',
      inputProps: {
        type: 'text',
      },
    },
  },
  contact: {
    addressSameAsSite: {
      id: 'contact.addressSameAsSite' as const,
      defaultValue: contactDetailsDefaultValues.addressSameAsSite,
      label: i18n.contactForm.address.sameAsSite,
    },
    businessPhoneNumber: {
      id: 'contact.businessPhoneNumber' as const,
      defaultValue: '',
      label: i18n.contactForm.businessPhoneNumber.label,
      inputProps: {
        type: 'text',
      },
    },
    contactEmail: {
      id: 'contact.contactEmail' as const,
      defaultValue: '',
      label: i18n.contactForm.contactEmail.label,
      inputProps: {
        type: 'email',
      },
    },
    code: {
      id: 'contact.code' as const,
      defaultValue: '',
      label: i18n.contactForm.verificationCode.label,
      inputProps: {
        type: 'text',
      },
    },
    contactForename: {
      id: 'contact.contactForename' as const,
      defaultValue: '',
      label: i18n.contactForm.contactForename.label,
      inputProps: {
        type: 'text',
      },
    },
    contactSurname: {
      id: 'contact.contactSurname' as const,
      defaultValue: '',
      label: i18n.contactForm.contactSurname.label,
      inputProps: {
        type: 'text',
      },
    },
    dateOfBirth: {
      id: 'contact.dateOfBirth' as const,
      defaultValue: '01/01/1970',
      label: 'Date Of Birth',
      inputProps: {
        type: 'date',
      },
    },
    position: {
      id: 'contact.position' as const,
      defaultValue: '',
      label: i18n.contactForm.position.label,
      inputProps: {
        type: 'text',
      },
    },
    postcode: {
      id: 'contact.postcode' as const,
      defaultValue: '',
      label: i18n.contactForm.postcode.label,
      inputProps: {
        type: 'text',
      },
    },
    address: {
      id: 'contact.address' as const,
      defaultValue: '',
      label: i18n.contactForm.address.label,
      inputProps: {
        type: 'text',
      },
    },
  },
  agreementSet: {
    authorized: {
      id: 'agreementSet.authorized' as const,
      defaultValue: agreementSetDefaultValues.authorized,
      label: i18n.agreementSet.authorized.label,
      disabled: false,
    },
    creditCheck: {
      id: 'agreementSet.creditCheck' as const,
      defaultValue: agreementSetDefaultValues.creditCheck,
      label: i18n.agreementSet.creditCheck.label,
      disabled: false,
    },
    smartMeterAgreement: {
      id: 'agreementSet.smartMeterAgreement' as const,
      defaultValue: agreementSetDefaultValues.smartMeterAgreement,
      label: i18n.agreementSet.smartMeterAgreement.label,
      disabled: false,
    },
    letterOfAuthority: {
      id: 'agreementSet.letterOfAuthority' as const,
      defaultValue: agreementSetDefaultValues.letterOfAuthority,
      label: i18n.agreementSet.letterOfAuthority.label,
      disabled: false,
    },
    termsAndConditions: {
      id: 'agreementSet.termsAndConditions' as const,
      defaultValue: agreementSetDefaultValues.termsAndConditions,
      label: i18n.agreementSet.termsAndConditions.label,
      disabled: false,
    },
    directDebitAgreement: {
      id: 'agreementSet.directDebitAgreement' as const,
      defaultValue: agreementSetDefaultValues.directDebitAgreement,
      label: i18n.agreementSet.directDebitAgreement.label,
      disabled: false,
    },
  },
}
