import { useCallback } from 'react'
import { Container } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { UTILITIES_LOOKUP } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { Step } from '~/components/Stepper/Stepper'
import { cfg } from '~/config/config'
import { RootState } from '~/store'
import { setCurrentFlow } from '~/store/reducers/form/formSlice'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { getStepsBySelectedUtilityTypes } from '~/utils/steps'
import { LayoutWithSubheader } from '../components/LayoutWithSubheader/LayoutWithSubheader'
import { CompanyInformationForm } from '../features/CompanyInformationForm/CompanyInformationForm'

function useOnFormSuccess() {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const selectedUtilities = useAppSelector((state: RootState) => state.form.selectedUtilities)

  const onFormSuccess = useCallback(
    function () {
      const currentFlow = selectedUtilities[0]
      dispatch(setCurrentFlow({ flow: currentFlow }))

      switch (currentFlow) {
        case UTILITIES_LOOKUP.ELECTRICITY:
          push(cfg.pages.electricity.usage)
          break
        case UTILITIES_LOOKUP.GAS:
          push(cfg.pages.gas.usage)
          break
        default:
          console.warn('Unsupported utility type. Redirecting to error page.')
          push(cfg.pages.error)
          break
      }
    },
    [dispatch, push, selectedUtilities]
  )

  return { onFormSuccess }
}

const CompanyInformationPage: NextPage = () => {
  const [pt6] = useSpacing('pt6')
  const { onFormSuccess } = useOnFormSuccess()
  const utilityTypes = useAppSelector((state: RootState) => state.form.selectedUtilities)

  const steps: Step[] = getStepsBySelectedUtilityTypes({ currentPage: cfg.pages.companyInformation, utilityTypes })

  return (
    <LayoutWithSubheader steps={steps}>
      <Container className={pt6}>
        <CompanyInformationForm onSuccess={onFormSuccess} />
      </Container>
    </LayoutWithSubheader>
  )
}

export default CompanyInformationPage
