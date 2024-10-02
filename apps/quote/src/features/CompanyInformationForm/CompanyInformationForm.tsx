import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { CreateCompanyPayload, CompanyDto } from '@watt/api-interface'
import { ButtonLoadingProps } from '@watt/components'
import { BusinessType, isBusinessType } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { BottomBar } from '~/components/BottomBar/BottomBar.component'
import { cfg } from '~/config/config'
import en from '~/i18n'
import { createCompanyThunk, createAcquisitionThunk } from '~/store/reducers/company/extraReducers'
import { useAppDispatch } from '~/store/selectors'
import { AgreementSection } from './AgreementSection'
import { CompanySection } from './CompanySection'
import { ContactSection } from './ContactSection'
import { useStyles } from './company.page.styles'
import { companyDetailsFormDefaultValues, CompanyDetailsForm, formConfig, PrefillableFormFields } from './formConfig'
import { getSoleTraderAddressValidationError } from './getSoleTraderAddressValidationError'

type CompanyInformationFormProps = {
  onSuccess?: (response: CompanyDto) => void
}

// eslint-disable-next-line react/prop-types
export const CompanyInformationForm: React.FC<CompanyInformationFormProps> = ({ onSuccess }): JSX.Element => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [mb32] = useSpacing('mb32')
  const classes = useStyles()
  const methods = useForm<CompanyDetailsForm>({ defaultValues: companyDetailsFormDefaultValues })

  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, setError, setValue } = methods

  const { enqueueSnackbar } = useSnackbar()
  const { t, c, d } = router.query

  useEffect(() => {
    const createAcquisition = async () => {
      const acquisitionTargetId = t as string
      const acquisitionCampaignId = c as string

      // if there is no acquisition target or campaign id, we don't need to create an acquisition
      if (!acquisitionTargetId && !acquisitionCampaignId) {
        return
      }

      // if either are missing we can not create an acquisition
      if (!acquisitionTargetId || !acquisitionCampaignId) {
        enqueueSnackbar(en.errors.missingAcquisitionQueryParameters, { variant: 'error' })
        router.replace(cfg.pages.login)
        return
      }

      const result = await dispatch(
        createAcquisitionThunk({ targetId: acquisitionTargetId, campaignId: acquisitionCampaignId })
      ).unwrap()

      if (result.data === null) {
        if (result.error !== null) {
          enqueueSnackbar(en.errors.missingAcquisitionQueryParameters, { variant: 'error' })
          router.replace(cfg.pages.login)
        }
      }
    }

    createAcquisition()
  }, [t, c, dispatch, enqueueSnackbar, router])

  useEffect(() => {
    try {
      const parsedCompanyInfoRaw = JSON.parse(
        Buffer.from(d as string, 'base64').toString('ascii')
      ) as PrefillableFormFields

      for (const key in parsedCompanyInfoRaw) {
        const _key = key as keyof PrefillableFormFields
        for (const value in parsedCompanyInfoRaw[_key]) {
          const _value = value as keyof PrefillableFormFields[keyof PrefillableFormFields]
          setValue(`${_key}.${_value}`, parsedCompanyInfoRaw[_key][_value])
        }
      }

      if (t && typeof t === 'string') {
        const decodedEmail = Buffer.from(t, 'base64').toString('ascii')
        setValue('contact.contactEmail', decodedEmail)
      }
    } catch (error) {
      // no need to catch errors here, if the data is not valid, we just don't prefill the form
      return
    }
  }, [d])

  const handleFormSubmit: SubmitHandler<CompanyDetailsForm> = async (data) => {
    setIsLoading(true)

    if (!data.contact.verifiedEmail) {
      setIsLoading(false)

      if (data.contact.code === '') {
        setError('contact.contactEmail', { type: 'manual', message: 'Please verify your email address to continue.' })
        return
      }

      setError('contact.code', { type: 'manual', message: 'Please verify your code.' })
      return
    }

    const businessType = isBusinessType(parseInt(data.company.type, 10).toString())
      ? parseInt(data.company.type, 10).toString()
      : ''

    if (businessType === BusinessType.SOLE_TRADER) {
      const addressValidationError = getSoleTraderAddressValidationError(
        data.company.soletraderPersonalDetails.addresses
      )

      if (addressValidationError) {
        setIsLoading(false)
        enqueueSnackbar(addressValidationError, { variant: 'error' })
        return
      }
    }

    const registrationNumber = businessType === BusinessType.LTD ? data.company.registrationNumber : null
    const charityNumber = businessType === BusinessType.CHARITY ? data.company.charityNumber : null

    const sanitizedAddresses = data.company.soletraderPersonalDetails.addresses.map((address) => {
      return {
        ...address,
        moved_in_at: format(new Date(address.moved_in_at), `yyyy-MM-dd'T'00:00:00`),
        moved_out_at: address.moved_out_at ? format(new Date(address.moved_out_at), `yyyy-MM-dd'T'00:00:00`) : null,
      }
    })

    // we only want to set soletrader_personal_details if the business type is sole trader
    const soletrader_personal_details =
      businessType === BusinessType.SOLE_TRADER
        ? {
            date_of_birth: data.company.soletraderPersonalDetails.dateOfBirth
              ? format(new Date(data.company.soletraderPersonalDetails.dateOfBirth), `yyyy-MM-dd'T'00:00:00`)
              : '',
            addresses: sanitizedAddresses,
          }
        : null

    const acquisition_info =
      typeof t == 'string' && typeof c == 'string'
        ? {
            acquisition_info: {
              campaign_id: c,
              target_id: t,
            },
          }
        : null

    try {
      const payload: CreateCompanyPayload = {
        company: {
          business_type: parseInt(businessType),
          name: data.company.name,
          registration_number: registrationNumber,
          charity_number: charityNumber,
          main_postcode: data.company.sitePostcode,
          main_address: data.company.siteAddress,
          mpan_key: data.company.mpanKey, // TODO get this value which is not collected on the form data.company.siteAddress
          mprn_key: data.company.mprnKey,
          soletrader_personal_details,
        },
        contact: {
          forename: data.contact.contactForename,
          surname: data.contact.contactSurname,
          email: data.contact.contactEmail,
          code: data.contact.code,
          phone: data.contact.businessPhoneNumber,
          position: data.contact.position,
        },
        site: {
          address: data.company.siteAddress,
          postcode: data.company.sitePostcode,
        },
        agreement_set: {
          authorized: data.agreementSet.authorized,
          credit_check: data.agreementSet.creditCheck,
          letter_of_authority: data.agreementSet.letterOfAuthority,
          terms_and_conditions: data.agreementSet.termsAndConditions,
          smart_meter_agreement: data.agreementSet.smartMeterAgreement,
          direct_debit_agreement: data.agreementSet.directDebitAgreement,
        },
        ...acquisition_info,
      }

      const result = await dispatch(createCompanyThunk(payload)).unwrap()

      if (result.error && result.message && result.data === null) {
        setValue('contact.verifiedEmail', false)
        enqueueSnackbar(result.message, { variant: 'error' })
        return null
      }

      if (onSuccess) {
        if (result.data) {
          onSuccess(result.data)
        }
      }
    } catch (error) {
      router.push(cfg.pages.error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitButtonProps: ButtonLoadingProps = {
    loading: isLoading,
    children: en.common.buttons.submit,
    buttonProps: {
      type: 'submit',
      form: formConfig.id,
    },
  }

  return (
    <>
      <FormProvider {...methods}>
        <form id={formConfig.id} onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={4} className={mb32}>
            <Grid item xs={12} md={3} xl={3}>
              <CompanySection />
            </Grid>
            <Grid item>
              <div className={classes.divider} />
            </Grid>
            <Grid item xs={12} md={3} xl={3}>
              <ContactSection />
            </Grid>
            <Grid item>
              <div className={classes.divider} />
            </Grid>
            <Grid item xs={12} md={5} xl={5}>
              <AgreementSection />
            </Grid>
          </Grid>
        </form>
      </FormProvider>

      <BottomBar nextButtonProps={submitButtonProps} />
    </>
  )
}
