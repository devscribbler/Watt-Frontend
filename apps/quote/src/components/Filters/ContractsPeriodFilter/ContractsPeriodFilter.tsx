import * as React from 'react'
import { Grid, Theme } from '@mui/material'
import { withStyles } from '@mui/styles'
import { Button } from '@watt/components'
import { useIsDesktop } from '@watt/components'
import { ContractLengthsType, CONTRACT_LENGTHS, GenericUtilityQuote, UtilityKindType } from '@watt/constants'
import { addFilter } from '~/store/reducers/quotes/quotesSlice'
import { useAppDispatch } from '~/store/selectors'

type Props = {
  utilityType: UtilityKindType
  quotes: GenericUtilityQuote[]
  className?: string
}

export const CustomButton = withStyles((theme: Theme) => ({
  root: {
    textTransform: 'initial',
    fontSize: '0.875rem',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    boxShadow: '0 2px 4px 0 rgba(17, 27, 36, 0.08)',
  },
}))(Button)

const defaultValues: Record<ContractLengthsType, boolean> = {
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

export const ContractsPeriodFilter = ({ utilityType, quotes, className }: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const isDesktop = useIsDesktop()
  const [checkedButtons, setCheckedButton] = React.useState(defaultValues)
  const allEnergyText = isDesktop ? 'All energy offers' : 'All'

  const filterByContractPeriod = React.useCallback(
    (period: ContractLengthsType, checked: boolean) => {
      dispatch(
        addFilter({
          utilityType,
          filter: {
            value: period,
            action: checked ? 'add' : 'remove',
            type: 'contractPeriodMonths',
          },
        })
      )
    },
    [dispatch, utilityType]
  )

  const handleResetFilters = React.useCallback(() => {
    //  Reset global filters
    Object.keys(CONTRACT_LENGTHS).map((key) => {
      filterByContractPeriod(key as unknown as ContractLengthsType, false)
    })
    setCheckedButton(defaultValues)
  }, [filterByContractPeriod])

  const handlePeriodButtonClick = React.useCallback(
    (contractPeriod: ContractLengthsType) => {
      const checked = !checkedButtons[contractPeriod]
      setCheckedButton((prevState) => ({ ...prevState, [contractPeriod]: checked }))
      filterByContractPeriod(contractPeriod, checked)
    },
    [filterByContractPeriod, checkedButtons]
  )

  const availableYears = React.useMemo(() => {
    const years = quotes.map((quote) => Math.ceil(quote.nextSupplierRates.durationMonths / 12))
    return [...new Set(years)]
  }, [quotes])

  const noneSelected = Object.keys(CONTRACT_LENGTHS).every(
    (key) => checkedButtons[key as unknown as ContractLengthsType] === false
  )

  return (
    <section className={className}>
      <Grid container spacing={isDesktop ? 10 : 2}>
        <Grid item xs lg={2}>
          <CustomButton
            variant={noneSelected ? 'contained' : 'outlined'}
            color="secondary"
            size="large"
            fullWidth
            onClick={handleResetFilters}
          >
            {allEnergyText}
          </CustomButton>
        </Grid>

        {Object.keys(CONTRACT_LENGTHS).map((key) => {
          const contractPeriod = Number(key) as ContractLengthsType
          const labelDesktop = CONTRACT_LENGTHS[contractPeriod]
          const labelMobile = `${contractPeriod} yr.`

          return (
            <Grid item xs lg={2} key={key}>
              <CustomButton
                size="large"
                fullWidth
                color="secondary"
                disabled={!availableYears.includes(contractPeriod)}
                variant={checkedButtons[contractPeriod] ? 'contained' : 'outlined'}
                onClick={() => handlePeriodButtonClick(contractPeriod)}
              >
                {isDesktop ? labelDesktop : labelMobile}
              </CustomButton>
            </Grid>
          )
        })}
      </Grid>
    </section>
  )
}
