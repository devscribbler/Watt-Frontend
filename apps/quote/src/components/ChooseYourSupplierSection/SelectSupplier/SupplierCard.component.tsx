import clsx from 'clsx'
import { Provider } from '@watt/api-interface'
import { useIsDesktop } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { useStyles } from './supplierCard.styles'

type Props = {
  supplier: Provider
  checked: boolean
}

export const SupplierCard = (props: Props): JSX.Element => {
  const { supplier, checked } = props
  const classes = useStyles(supplier.logo_file_name)
  const [py6, py7] = useSpacing('py6', 'py7')
  const isDesktop = useIsDesktop()

  return (
    <div className={clsx(classes.supplierCardContainer, checked ? classes.activeSupplierCard : null)}>
      <img
        className={clsx(classes.card, isDesktop ? py6 : py7)}
        src={`/assets/img/providers/${supplier.logo_file_name}`}
      />
    </div>
  )

  // <div>
  //     <input
  //       ref={ref}
  //       type="radio"
  //       value={value}
  //       onChange={onChange}
  //       name={name}
  //       id={supplier.name}
  //       style={{ display: 'none' }}
  //     />
  //     <label htmlFor={supplier.name}>
  //       <img className={clsx(classes.card, isDesktop ? py6 : py7)} src={`/assets/img/providers/${supplier.logo_file_name}`} />
  //     </label>
  //   </div>
  // return (
  //   <ButtonBase
  //     onClick={handleClick}
  //     className={clsx(classes.supplierCardContainer, activeCard === name && classes.activeSupplierCard)}
  //   >
  //     <img className={clsx(classes.card, isDesktop ? py6 : py7)} src={`/assets/img/providers/${supplier.logo_file_name}`} />
  //   </ButtonBase>
  // )
}
