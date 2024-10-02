import * as React from 'react'
import { Grid, Snackbar } from '@mui/material'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { useSpacing } from '@watt/theme'
import { CustomToast } from '~/components/common/CustomToast/CustomToast'
import { NOTIFICATION_DURATION, SNACKBAR_POSITION } from '~/constants/global'
import { CompanySection } from '~/features/companyInfo/CompanySection'
import { ContactSection } from '~/features/companyInfo/ContactSection'
import { companyDetailsForm, CompanyDetailsForm, formConfig } from '~/features/companyInfo/formConfig'
import en from '~/i18n'
import {
  getCompanyDetailsThunk,
  getContactDetailsThunk,
  setCompanyDetailsThunk,
} from '~/store/reducers/account/extraReducers'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { useStyles } from './company.page.styles'

export const CompanyPage: React.FC = (): JSX.Element => {
  const [mb32] = useSpacing('mb32')
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const company = useAppSelector((state) => state.account.company)
  const contact = useAppSelector((state) => state.account.contact)
  const updateStatus = useAppSelector((state) => state.account.setCompanyDetailsStatus)
  const [openToast, setOpenToast] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState('')
  const [unsavedChanges, setUnsavedChanges] = React.useState(false)
  const [toastSeverity, setToastSeverity] = React.useState<'error' | 'success'>('success')
  const methods = useForm<CompanyDetailsForm>({ defaultValues: companyDetailsForm })

  const { handleSubmit, reset, watch } = methods
  const companyWatcher = watch('company')
  const contactWatcher = watch('contact')

  React.useEffect(() => {
    reset({ company, contact })
  }, [reset, company, contact])

  React.useEffect(() => {
    dispatch(getCompanyDetailsThunk())
    dispatch(getContactDetailsThunk())
  }, [dispatch])

  React.useEffect(() => {
    const initialData = JSON.stringify({ company, contact })
    const userModifiedData = JSON.stringify({ company: companyWatcher, contact: contactWatcher })

    if (initialData !== userModifiedData) {
      setUnsavedChanges(true)
    } else {
      setUnsavedChanges(false)
    }
  }, [company, contact, companyWatcher, contactWatcher, setUnsavedChanges])

  const handleFormSubmit: SubmitHandler<CompanyDetailsForm> = async (data) => {
    // Prevent the form to be submitted if the were no changes made by the client
    if (!unsavedChanges) {
      return
    }

    await dispatch(setCompanyDetailsThunk(data))
  }

  React.useEffect(() => {
    if (updateStatus === 'success') {
      setToastSeverity('success')
      setToastMessage(en.companyInformation.notifications.success)
      setOpenToast(true)
    } else if (updateStatus === 'error') {
      setToastSeverity('error')
      setToastMessage(en.companyInformation.notifications.error)
      setOpenToast(true)
    }
  }, [updateStatus])

  return (
    <FormProvider {...methods}>
      <form id={formConfig.id} onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={10} className={mb32}>
          <Grid item xs={12} md={5} xl={3}>
            <CompanySection />
          </Grid>
          <Grid item md={1}>
            <div className={classes.divider} />
          </Grid>
          <Grid item xs={12} md={5} xl={3}>
            <ContactSection />
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={SNACKBAR_POSITION}
        open={openToast}
        onClose={() => setOpenToast(false)}
        autoHideDuration={NOTIFICATION_DURATION}
      >
        <CustomToast severity={toastSeverity} onClick={() => setOpenToast(false)}>
          {toastMessage}
        </CustomToast>
      </Snackbar>
    </FormProvider>
  )
}
