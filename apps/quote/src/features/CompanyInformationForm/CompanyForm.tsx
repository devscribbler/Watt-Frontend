import { AddressField } from './field/AddressField'
import { BusinessField } from './field/BusinessField'
import { formConfig } from './formConfig'

const { type, siteAddress, name, registrationNumber, sitePostcode } = formConfig.company

export const CompanyForm = (): JSX.Element => {
  return (
    <>
      <AddressField
        postcodeKey="company.sitePostcode"
        postcodeField={sitePostcode}
        postcodeErrorSelector={(errors) => errors.company?.sitePostcode}
        postcodeTooltip={sitePostcode.label}
        addressKey="company.siteAddress"
        mpanKey="company.mpanKey"
        mprnKey="company.mprnKey"
        addressField={siteAddress}
        addressErrorSelector={(errors) => errors.company?.siteAddress}
      />

      <BusinessField registrationNumber={registrationNumber} type={type} name={name} />
    </>
  )
}
