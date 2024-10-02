import { useCallback, useEffect, useState } from 'react'
import { ButtonProps, Checkbox, Divider, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { FormProvider, useForm } from 'react-hook-form'
import { ButtonLoadingProps, LoadingSpinnerBackdrop } from '@watt/components'
import { UtilityKindType, UTILITIES_KIND_PROPERTY_MAP } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { BottomBar } from '~/components/BottomBar/BottomBar.component'
import {
  ContractPreviewSection,
  PaymentDetailsSection,
  QuotePreviewSection,
  DirectDebitPaymentFormType,
} from '~/components/UtilityContract'
import { cfg } from '~/config/config'
import en from '~/i18n'
import { setDirectDebitAccountInfoThunk } from '~/store/reducers/banking/extraReducers'
import { useSelectedQuoteByUtilityType } from '~/store/reducers/cart/cartSlice'
import { getCartByUtilityTypeThunk } from '~/store/reducers/cart/extraReducers'
import { signContractByIdThunk } from '~/store/reducers/contracts/extraReducers'
import { setCurrentFlow } from '~/store/reducers/form/formSlice'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { getPage } from '~/utils/steps'
import { useStyles } from './utility.contract.page.styles'

export const CONTRACT_SIGNING_FORM_ID = 'contract-signing-form-id'

const defaultValues = {
  bankName: '',
  accountHolderName: '',
  accountNumber: '',
  sortCode: '',
  signature: '',
  isAuthorized: false,
  termsAndConditions: false,
}

type Props = {
  nextUtility?: UtilityKindType
  utilityType: UtilityKindType
}
export function UtilityContractPage({ nextUtility, utilityType }: Props) {
  const [pt16, pb24] = useSpacing('pt16', 'pb24')
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [isGettingContract, setIsGettingContract] = useState(false)
  const selectedQuote = useSelectedQuoteByUtilityType(utilityType)
  const utilityPropertyName = UTILITIES_KIND_PROPERTY_MAP[utilityType]
  const contract = useAppSelector((state) => state.cart[utilityPropertyName]?.contract)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const directDebitPrefilledInfo = useAppSelector((state) => state.banking.directDebit)
  const previousPage = getPage(utilityType, 'contract')
  const form = useForm<DirectDebitPaymentFormType>({ defaultValues: { ...defaultValues, ...directDebitPrefilledInfo } })

  const { contract_id: contractId } = router.query

  useEffect(() => {
    setIsGettingContract(true)
    dispatch(getCartByUtilityTypeThunk({ utilityType, contractId: contractId ? (contractId as string) : undefined }))
      .unwrap()
      .then(() => {
        setIsGettingContract(false)
      })
      .catch((e) => {
        enqueueSnackbar(e.message, { variant: 'error' })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractId, utilityType, dispatch, enqueueSnackbar])

  const submitButtonProps: ButtonLoadingProps = {
    loading: isLoading,
    children: en.common.buttons.signContract,
    buttonProps: {
      form: CONTRACT_SIGNING_FORM_ID,
    },
  }

  const previousButtonProps: ButtonProps = {
    children: 'Back',
    onClick: () => {
      router.push(previousPage)
    },
  }

  const handleFormSubmit = useCallback(
    (data: DirectDebitPaymentFormType) => {
      const run = async (data: DirectDebitPaymentFormType) => {
        const directDebitData = {
          account_holder_name: data.accountHolderName,
          account_number: data.accountNumber,
          bank_name: data.bankName,
          sort_code: data.sortCode,
        }

        setIsLoading(true)

        try {
          if (selectedQuote && contract) {
            await dispatch(setDirectDebitAccountInfoThunk(directDebitData))
              .unwrap()
              .catch(() => {
                const message = 'There was an error with your bank details'
                enqueueSnackbar(message, { variant: 'error' })
                throw message
              })
            await dispatch(
              signContractByIdThunk({ contractId: contract.id, signature: data.signature, comments: data.comments })
            )
              .unwrap()
              .catch(() => {
                const message = "We couldn't sign the contract"
                enqueueSnackbar(message, { variant: 'error' })
                throw message
              })

            if (nextUtility) {
              // contract signed, set them to the next utility.
              dispatch(setCurrentFlow({ flow: nextUtility }))
              await router.push(getPage(nextUtility, 'usage'))
            } else {
              await router.push(cfg.pages.premium)
            }
          }
        } finally {
          setIsLoading(false)
        }
      }
      run(data)
    },
    [selectedQuote, contract, dispatch, nextUtility, enqueueSnackbar, router]
  )

  const viewContract = useCallback(() => {
    form.setValue('contractViewed', true)
    // this needs to be called because set value doesn't update form validation state
    form.trigger('contractViewed')
  }, [form])

  const contractViewedValue = useCallback(() => {
    return !form.formState.errors.contractViewed && !form.getValues('contractViewed')
      ? undefined
      : form.getValues('contractViewed')
  }, [form])

  if (!selectedQuote || !contract) {
    return null
  }

  if (isGettingContract) {
    return <LoadingSpinnerBackdrop />
  }

  return (
    <FormProvider {...form}>
      <div className={pb24}>
        <Grid container spacing={10} className={pt16}>
          <Grid item xs={12} lg={8}>
            <Grid container spacing={10}>
              <Grid item xs={12}>
                <QuotePreviewSection selectedQuote={selectedQuote} />
              </Grid>

              <Grid className={classes.contractPreview} item xs={12} lg={12}>
                <ContractPreviewSection
                  url={contract.pdfUrl}
                  contractViewed={contractViewedValue()}
                  onContractViewed={viewContract}
                />
                <Checkbox className={classes.hiddenInput} {...form.register('contractViewed', { required: true })} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={'auto'} lg={1} container justifyContent="center">
            <Divider orientation="vertical" className={classes.divider} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <PaymentDetailsSection formId={CONTRACT_SIGNING_FORM_ID} onFormSubmit={handleFormSubmit} />
          </Grid>
        </Grid>
        <BottomBar previousButtonProps={previousButtonProps} nextButtonProps={submitButtonProps} />
      </div>
    </FormProvider>
  )
}
