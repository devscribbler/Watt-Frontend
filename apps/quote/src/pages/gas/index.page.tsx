import { Container } from '@mui/material'
import type { NextPage } from 'next'
import { UTILITIES_LOOKUP } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { LayoutWithSubheader } from '~/components/LayoutWithSubheader/LayoutWithSubheader'
import { cfg } from '~/config/config'
import { UtilityInformation } from '~/features/UtilityInformation/UtilityInformation'
import { RootState } from '~/store'
import { useAppSelector } from '~/store/selectors'
import { getStepsBySelectedUtilityTypes } from '~/utils/steps'

const GasInformationPage: NextPage = () => {
  const [pt10] = useSpacing('pt10')
  const gasUsage = useAppSelector((state) => state.usage.gas)
  const utilityTypes = useAppSelector((state: RootState) => state.form.selectedUtilities)
  const steps = getStepsBySelectedUtilityTypes({ currentPage: cfg.pages.gas.usage, utilityTypes })

  return (
    <LayoutWithSubheader steps={steps}>
      <Container className={pt10}>
        <UtilityInformation utilityUsage={gasUsage} utilityType={UTILITIES_LOOKUP.GAS} nextPage={cfg.pages.gas.quote} />
      </Container>
    </LayoutWithSubheader>
  )
}

export default GasInformationPage
