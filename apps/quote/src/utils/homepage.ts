import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { UtilityKindType } from '@watt/constants'
import { setSelectedUtilities } from '~/store/reducers/form/formSlice'
import { useAppDispatch } from '~/store/selectors'
import { cfg } from '../config/config'

export const useOnClickGetAQuote = (selectedUtilities: UtilityKindType[]): (() => void) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  return useCallback(() => {
    if (selectedUtilities.length === 0) {
      enqueueSnackbar('Please select at least one Utility to continue.', { variant: 'warning' })
      return
    }

    dispatch(setSelectedUtilities({ selectedUtilities }))
    router.push(cfg.pages.companyInformation)
  }, [router, selectedUtilities, dispatch, enqueueSnackbar])
}
