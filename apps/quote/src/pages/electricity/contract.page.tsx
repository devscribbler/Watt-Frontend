import { Container } from '@mui/material'
import { NextPage } from 'next'
import { LayoutWithSubheader } from '~/components/LayoutWithSubheader/LayoutWithSubheader'
import { cfg } from '~/config/config'
import { UtilityContract } from '~/features/UtilityContract/UtilityContract'
import { RootState } from '~/store'
import { useAppSelector } from '~/store/selectors'
import { getStepsBySelectedUtilityTypes } from '~/utils/steps'

const ElectricityContractSigningPage: NextPage = () => {
  const utilityTypes = useAppSelector((state: RootState) => state.form.selectedUtilities)
  const steps = getStepsBySelectedUtilityTypes({ currentPage: cfg.pages.electricity.contract, utilityTypes })

  return (
    <LayoutWithSubheader steps={steps}>
      <Container>
        <UtilityContract />
      </Container>
    </LayoutWithSubheader>
  )
}

export default ElectricityContractSigningPage
