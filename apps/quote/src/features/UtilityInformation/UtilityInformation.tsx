import { useState, useEffect, useCallback } from 'react'
import { Divider, Grid } from '@mui/material'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { GetElectricityUsageResponse, GetGasUsageResponse, SetUsagePayload } from '@watt/api-interface'
import { ButtonLoadingProps } from '@watt/components'
import { useIsDesktop } from '@watt/components'
import { LoadingSpinnerBackdrop } from '@watt/components'
import {
  getMinimumContractStartDate,
  MINIMUM_CONTRACT_START_OFFSET_FOR_PROVIDERS_DAYS_IN_FUTURE,
  NOT_QUOTABLE_ERROR_CODE,
  UTILITIES_LOOKUP,
  UtilityKindType,
} from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { BottomBar } from '~/components/BottomBar/BottomBar.component'
import { ChooseYourSupplierSection } from '~/components/ChooseYourSupplierSection/ChooseYourSupplierSection'
import { cfg } from '~/config/config'
import { UtilityUsageForm, CONTRACT_USAGE_FORM_ID } from '~/constants/forms'
import en from '~/i18n'
import { GetUsageByUtilityTypeThunkRejectedPayload } from '~/store/reducers/form/formSlice'
import { getProvidersByUtilityTypeThunk } from '~/store/reducers/providers/extraReducers'
import { generateQuotesByUtilityTypeThunk } from '~/store/reducers/quotes/extraReducers'
import { getUsageByUtilityTypeThunk, setUsageThunk } from '~/store/reducers/usage/extraReducers'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { ContractAndUsageFormSection } from './ContractAndUsage/ContractAndUsageFormSection'
import { ElectralinkSection } from './ElectralinkSection/ElectralinkSection'

// Although these values are passed to the form, you should be using "setPrefilledValues" to set the defaults.
const defaultValues: UtilityUsageForm = {
  hasNoContract: false,
  contractStartDate: getMinimumContractStartDate(),
  mpan: '',
  mprn: '',
  annualUsage: '',
  supplier: '',
  noWattSupplier: '',
}

interface UtilityInformationProps {
  utilityUsage: GetElectricityUsageResponse | GetGasUsageResponse | null
  utilityType: UtilityKindType
  nextPage: string
}

export const UtilityInformation = ({ utilityUsage, utilityType, nextPage }: UtilityInformationProps): JSX.Element => {
  const router = useRouter()
  const isDesktop = useIsDesktop()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()
  // TODO (Stephen): If the page gets refreshed then company state is lost and mpan is no longer loaded
  const companySlice = useAppSelector((state) => state.company)
  const mpan = companySlice.mpan || '' // TODO handle mpan being null
  const mprn = companySlice.mprn || '' // TODO handle mprn being null
  const providers = useAppSelector((state) => state.providers.providers)
  const provider = providers.find((p) => p.id === utilityUsage?.contract.provider_id)
  const [pb24] = useSpacing('pb24')
  const { enqueueSnackbar } = useSnackbar()
  const [prefilledValues, setPrefilledValues] = useState<UtilityUsageForm | undefined>(undefined)
  const utilityFormMethods = useForm({
    defaultValues: defaultValues,
  })

  const { handleSubmit, reset } = utilityFormMethods

  useEffect(() => {
    if (prefilledValues) {
      reset(prefilledValues)
    }
  }, [prefilledValues, reset])

  useEffect(() => {
    setIsLoading(true)
    dispatch(getUsageByUtilityTypeThunk(utilityType))
      .unwrap()
      .catch(({ error }: { utilityType: number; error: GetUsageByUtilityTypeThunkRejectedPayload }) => {
        if (error.code === NOT_QUOTABLE_ERROR_CODE) {
          router.push(cfg.pages.error)
        }
      })
      .finally(() => {
        // The reason this dispatch is called only after the previous one completes
        // is because we want to show Electralink data if existent, and if not existent, show suppliers list.
        dispatch(getProvidersByUtilityTypeThunk(utilityType))
          .unwrap()
          .finally(() => setIsLoading(false))
      })
  }, [dispatch, router, utilityType])

  useEffect(() => {
    if (mpan) {
      setPrefilledValues((p) => ({ ...p, mpan } as UtilityUsageForm))
    }
  }, [mpan])

  useEffect(() => {
    if (mprn) {
      setPrefilledValues((p) => ({ ...p, mprn } as UtilityUsageForm))
    }
  }, [mprn])

  useEffect(() => {
    if (utilityUsage) {
      const supplierName = providers.find((provider) => provider.id === utilityUsage.contract.provider_id)

      setPrefilledValues({
        annualUsage: String(utilityUsage.contract.total_annual_usage),
        contractStartDate: getMinimumContractStartDate(),
        hasNoContract: false,
        mpan,
        mprn,
        supplier: supplierName?.name || '',
        noWattSupplier: utilityUsage.contract.non_watt_provider_name || supplierName?.name || '',
      })
    }
  }, [utilityUsage, mpan, mprn, providers])

  const onFormSubmit = useCallback(
    (data: UtilityUsageForm) => {
      const run = async () => {
        setIsSubmitting(true)
        try {
          const payload: SetUsagePayload = {
            utility_type: utilityType,
            total_annual_usage: Number(data.annualUsage),
          }

          if (new Date(data.contractStartDate) < new Date(getMinimumContractStartDate())) {
            enqueueSnackbar(
              `Contract start date must be at least ${MINIMUM_CONTRACT_START_OFFSET_FOR_PROVIDERS_DAYS_IN_FUTURE} days from now.`,
              { variant: 'error' }
            )
            return
          }

          if (data.hasNoContract === false) {
            const providerId = providers.find((provider) => provider.name === data.supplier)

            payload.start_date = format(new Date(data.contractStartDate), `yyyy-MM-dd'T00:00:00`)

            if (data.noWattSupplier !== '' && data.noWattSupplier !== data.supplier) {
              payload.non_watt_provider_name = data.noWattSupplier
            } else {
              payload.provider_id = providerId?.id
            }
          }

          if (data.hasNoContract) {
            payload.has_no_contract = true
            const providerId = providers.find((provider) => provider.name === data.supplier)

            const startDate = new Date()
            startDate.setDate(startDate.getDate() + 16)
            payload.start_date = format(startDate, `yyyy-MM-dd'T00:00:00`)

            if (data.noWattSupplier !== '' && data.noWattSupplier !== data.supplier) {
              payload.non_watt_provider_name = data.noWattSupplier
            } else {
              payload.provider_id = providerId?.id
            }
          }

          if (data.mprn) payload.mprn = data.mprn

          await dispatch(setUsageThunk(payload)).unwrap()
          await dispatch(generateQuotesByUtilityTypeThunk(utilityType))
            .unwrap()
            .catch(() => {
              enqueueSnackbar('Something went wrong. Action could not be completed.', { variant: 'error' })
            })

          await router.push(nextPage)
        } catch (error) {
          enqueueSnackbar("Something went wrong and we wouldn't complete this action.", { variant: 'error' })
          router.push(cfg.pages.error)
        } finally {
          setIsSubmitting(false)
        }
      }

      run()
    },
    [utilityType, dispatch, router, nextPage, enqueueSnackbar, providers]
  )

  const submitButtonProps: ButtonLoadingProps = {
    loading: isSubmitting,
    children: en.common.buttons.seeQuote,
    buttonProps: {
      type: 'submit',
      form: CONTRACT_USAGE_FORM_ID,
    },
  }

  if (isLoading) {
    return <LoadingSpinnerBackdrop />
  }

  return (
    <>
      <form id={CONTRACT_USAGE_FORM_ID} onSubmit={handleSubmit(onFormSubmit)} className={pb24}>
        <Grid container spacing={isDesktop ? 10 : 4}>
          <Grid item xs={12} lg={8}>
            {utilityType === UTILITIES_LOOKUP.ELECTRICITY && utilityUsage?.usage?.length && mpan && provider ? (
              <ElectralinkSection usage={utilityUsage.usage} mpan={mpan} provider={provider} />
            ) : (
              <ChooseYourSupplierSection
                prefilledValues={prefilledValues}
                utilityType={utilityType}
                providers={providers}
                formMethods={utilityFormMethods}
              />
            )}
          </Grid>
          <Grid lg={1} item container justifyContent="center">
            <Divider variant="fullWidth" orientation={isDesktop ? 'vertical' : 'horizontal'} />
          </Grid>

          <Grid item xs={12} lg={3}>
            <ContractAndUsageFormSection
              formMethods={utilityFormMethods}
              prefilledValues={prefilledValues}
              utilityType={utilityType}
            />
          </Grid>
        </Grid>
      </form>

      <BottomBar nextButtonProps={submitButtonProps} />
    </>
  )
}
