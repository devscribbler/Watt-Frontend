import { ClassNameMap } from '@mui/styles'
import { useSoleTraderAddresses } from './useSoleTraderAddresses'

export const AddressHistoryNavBar = ({
  selectedIndex,
  onChange,
  classes,
}: {
  selectedIndex: number
  onChange: (index: number) => void
  classes: ClassNameMap<string>
}) => {
  const { fields } = useSoleTraderAddresses()
  return (
    <>
      {fields.map((_: typeof fields[0], index: number) => (
        <div
          key={index}
          onClick={() => onChange(index)}
          className={selectedIndex === index ? classes.fieldChipSelected : classes.fieldChipUnselected}
        />
      ))}
    </>
  )
}
