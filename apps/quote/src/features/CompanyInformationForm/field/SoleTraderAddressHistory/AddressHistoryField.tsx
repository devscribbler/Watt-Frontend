import { useFormContext } from 'react-hook-form'
import en from '~/i18n'
import { CompanyDetailsForm } from '../../formConfig'
import { AddressField } from '../AddressField'
import { useStyles } from './AddressHistoryField.styles'
import { MoveInDatePicker } from './MoveInDatePicker'
import { MoveOutDatePicker } from './MoveOutDatePicker'
import { useSoleTraderAddresses } from './useSoleTraderAddresses'

export const AddressHistoryField = ({
  selectedIndex,
  index,
  lastMoveInDate,
}: {
  selectedIndex: number
  index: number
  lastMoveInDate: string | undefined
}) => {
  const { fields } = useSoleTraderAddresses()
  const classes = useStyles({ fieldCount: fields.length })
  const { register } = useFormContext<CompanyDetailsForm>()

  return (
    <div className={selectedIndex == index ? classes.fieldSelected : classes.fieldUnselected}>
      <AddressField
        {...register(`company.soletraderPersonalDetails.addresses.${index}.address`)}
        {...register(`company.soletraderPersonalDetails.addresses.${index}.postcode`)}
        addressKey={`company.soletraderPersonalDetails.addresses.${index}.address`}
        postcodeKey={`company.soletraderPersonalDetails.addresses.${index}.postcode`}
        postcodeField={{
          id: `company.soletraderPersonalDetails.addresses.${index}.postcode`,
          label: en.companyInformation.companyForm.soleTrader.postcodeHistory.label,
        }}
        addressField={{
          id: `company.soletraderPersonalDetails.addresses.${index}.address`,
          label: en.companyInformation.companyForm.soleTrader.addressHistory.label,
        }}
        postcodeErrorSelector={(errors) => errors.company?.soletraderPersonalDetails?.addresses?.[index]?.postcode}
        addressErrorSelector={(errors) => errors.company?.soletraderPersonalDetails?.addresses?.[index]?.address}
      />
      <div className={classes.gridRowNoCenter}>
        <MoveInDatePicker index={index} selectedIndex={selectedIndex} lastMoveInDate={lastMoveInDate} />
        {index !== 0 && (
          <MoveOutDatePicker index={index} selectedIndex={selectedIndex} lastMoveInDate={lastMoveInDate} />
        )}
      </div>
    </div>
  )
}
