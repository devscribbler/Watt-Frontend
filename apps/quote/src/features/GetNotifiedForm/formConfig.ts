import { UtilityType } from '@watt/components'

type userInformationType = {
  fullName: string
  email: string
  selectedUtilities: UtilityType[]
}

const userInformationDefaultValues: userInformationType = {
  fullName: '',
  email: '',
  selectedUtilities: [],
}

const datesInformationDefaultValues = {
  contractEndDate: new Date(),
  optContractEnd1: new Date(),
  optContractEnd2: new Date(),
  optContractEnd3: new Date(),
  optContractEnd4: new Date(),
}

export const getNotifiedFormDefaultValues = {
  userInformation: userInformationDefaultValues,
  datesInformation: datesInformationDefaultValues,
}

export type UserInformationDetails = typeof userInformationDefaultValues
export type DatesInformationDetails = typeof datesInformationDefaultValues
export type GetNotifiedFormValues = typeof getNotifiedFormDefaultValues

export const formConfig = {
  id: 'get-notified-form',
  userInformation: {
    fullName: {
      id: 'userInformation.fullName',
      defaultValue: userInformationDefaultValues.fullName,
      label: 'Full Name',
      disabled: false,
      inputProps: {
        type: 'text',
      },
    },
    email: {
      id: 'userInformation.email',
      defaultValue: userInformationDefaultValues.email,
      label: 'Email',
      disabled: false,
      inputProps: {
        type: 'email',
      },
    },
    selectedUtilities: {
      id: 'userInformation.selectedUtilities',
      defaultValue: userInformationDefaultValues.selectedUtilities,
      label: 'Select Utilities',
      disabled: false,
      inputProps: {
        type: 'checkbox',
      },
    },
  },
  datesInformation: {
    contractEndDate: {
      id: 'datesInformation.contractEndDate',
      defaultValue: datesInformationDefaultValues.contractEndDate,
      label: 'Contract End Date',
      disabled: false,
      inputProps: {
        type: 'date',
      },
    },
    optContractEnd1: {
      id: 'datesInformation.optContractEnd1',
      defaultValue: datesInformationDefaultValues.optContractEnd1,
      label: 'Contract End Date (if more than one)',
      disabled: false,
      inputProps: {
        type: 'date',
      },
    },
    optContractEnd2: {
      id: 'datesInformation.optContractEnd2',
      defaultValue: datesInformationDefaultValues.optContractEnd2,
      label: 'Contract End Date (if more than two)',
      disabled: false,
      inputProps: {
        type: 'date',
      },
    },
    optContractEnd3: {
      id: 'datesInformation.optContractEnd3',
      defaultValue: datesInformationDefaultValues.optContractEnd3,
      label: 'Contract End Date (if more than three)',
      disabled: false,
      inputProps: {
        type: 'date',
      },
    },
    optContractEnd4: {
      id: 'datesInformation.optContractEnd4',
      defaultValue: datesInformationDefaultValues.optContractEnd4,
      label: 'Contract End Date (if more than four)',
      disabled: false,
      inputProps: {
        type: 'date',
      },
    },
  },
}
