import { Container } from '@mui/material'
import { NextPage } from 'next'
import { LayoutWithSubheader } from '~/components/LayoutWithSubheader/LayoutWithSubheader'
import { UtilityQuote } from '~/features/UtilityQuote/UtilityQuote'
import { RootState } from '~/store'
import { useAppSelector } from '~/store/selectors'
import { getStepsBySelectedUtilityTypes } from '~/utils/steps'

const ElectricityQuotePage: NextPage = () => {
  const utilityTypes = useAppSelector((state: RootState) => state.form.selectedUtilities)
  const selectedUtilityType = useAppSelector((state: RootState) => state.form.currentFlow)

  if (!selectedUtilityType) {
    throw new Error("Can't render Quote component without utilityType")
  }

  const steps = getStepsBySelectedUtilityTypes({ currentPage: '/electricity/quote', utilityTypes })

  return (
    <LayoutWithSubheader steps={steps}>
      <Container>
        <UtilityQuote />
      </Container>
    </LayoutWithSubheader>
  )
}

export default ElectricityQuotePage
