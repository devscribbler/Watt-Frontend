import { useEffect } from 'react'
import { Container } from '@mui/material'
import { NextPage } from 'next'
import { useSnackbar } from 'notistack'
import { LayoutWithSubheader } from '~/components/LayoutWithSubheader/LayoutWithSubheader'
import { cfg } from '~/config/config'
import { UtilityQuote } from '~/features/UtilityQuote/UtilityQuote'
import { RootState } from '~/store'
import { generateQuotesByUtilityTypeThunk } from '~/store/reducers/quotes/extraReducers'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { getStepsBySelectedUtilityTypes } from '~/utils/steps'

const GasQuotePage: NextPage = () => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const utilityTypes = useAppSelector((state: RootState) => state.form.selectedUtilities)
  const selectedUtilityType = useAppSelector((state: RootState) => state.form.currentFlow)

  if (!selectedUtilityType) {
    throw new Error("Can't render Quote component without utilityType")
  }

  const steps = getStepsBySelectedUtilityTypes({ currentPage: cfg.pages.gas.quote, utilityTypes })

  useEffect(() => {
    dispatch(generateQuotesByUtilityTypeThunk(selectedUtilityType))
      .unwrap()
      .catch(() => {
        enqueueSnackbar('Something went wrong.', { variant: 'error' })
      })
  }, [dispatch, enqueueSnackbar, selectedUtilityType])

  return (
    <LayoutWithSubheader steps={steps}>
      <Container>
        <UtilityQuote />
      </Container>
    </LayoutWithSubheader>
  )
}

export default GasQuotePage
