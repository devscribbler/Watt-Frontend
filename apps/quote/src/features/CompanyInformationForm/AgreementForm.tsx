import { Box, Checkbox, InputLabel, Link } from '@mui/material'
import { useStyles } from './AgreementForm.styles'
import { FormField } from './field/FormField'
import { formConfig } from './formConfig'

const { authorized, creditCheck, letterOfAuthority, termsAndConditions, smartMeterAgreement, directDebitAgreement } =
  formConfig.agreementSet

export const AgreementForm = () => {
  const classes = useStyles()

  return (
    <>
      <FormField
        id={authorized.id}
        name="agreementSet.authorized"
        validation={{ required: true }}
        errorSelector={(errors) => errors.agreementSet?.authorized}
        render={({ field }) => (
          <InputLabel htmlFor={authorized.id} className={classes.textFormatting}>
            <Checkbox id={authorized.id} {...field} /> {authorized.label}
          </InputLabel>
        )}
      />

      <FormField
        id={creditCheck.id}
        name="agreementSet.creditCheck"
        validation={{ required: true }}
        errorSelector={(errors) => errors.agreementSet?.creditCheck}
        render={({ field }) => (
          <InputLabel htmlFor={creditCheck.id} className={classes.textFormatting}>
            <Checkbox id={creditCheck.id} {...field} /> {creditCheck.label}
          </InputLabel>
        )}
      />

      <FormField
        id={letterOfAuthority.id}
        name="agreementSet.letterOfAuthority"
        validation={{ required: true }}
        errorSelector={(errors) => errors.agreementSet?.letterOfAuthority}
        render={({ field }) => (
          <InputLabel htmlFor={letterOfAuthority.id} className={classes.loaInputLabel}>
            <div className={classes.loaInputRoot}>
              <div>
                <Checkbox id={letterOfAuthority.id} {...field} />
              </div>
              <div className={classes.loaInputInnerPadding}>
                <span className={classes.loaTextSpan}>
                  {letterOfAuthority.label.substring(0, letterOfAuthority.label.indexOf('Letter of Authority'))}
                  <Link href="assets/pdf/watt_loa.pdf" target="_blank" rel="noopener noreferrer">
                    {letterOfAuthority.label.substring(
                      letterOfAuthority.label.indexOf('Letter of Authority'),
                      letterOfAuthority.label.indexOf('to allow Watt.co.uk')
                    )}
                  </Link>
                  {letterOfAuthority.label.substring(letterOfAuthority.label.indexOf('to allow Watt.co.uk'))}
                </span>
              </div>
            </div>
          </InputLabel>
        )}
      />

      <FormField
        id={termsAndConditions.id}
        name="agreementSet.termsAndConditions"
        validation={{ required: true }}
        errorSelector={(errors) => errors.agreementSet?.termsAndConditions}
        render={({ field }) => (
          <InputLabel htmlFor={termsAndConditions.id} className={classes.textFormatting}>
            <Checkbox id={termsAndConditions.id} {...field} />{' '}
            {termsAndConditions.label.substring(
              termsAndConditions.label.indexOf('I agree with the'),
              termsAndConditions.label.indexOf('Terms and Conditions')
            )}
            <Link href="assets/pdf/watt-terms-and-conditions.pdf" rel="noopener noreferrer" target="_blank">
              {termsAndConditions.label.substring(
                termsAndConditions.label.indexOf('Terms and Conditions'),
                termsAndConditions.label.indexOf('of Watt.co.uk')
              )}
            </Link>
            {termsAndConditions.label.substring(
              termsAndConditions.label.indexOf('of'),
              termsAndConditions.label.length
            )}
          </InputLabel>
        )}
      />

      <FormField
        id={smartMeterAgreement.id}
        name="agreementSet.smartMeterAgreement"
        validation={{ required: false }}
        errorSelector={(errors) => errors.agreementSet?.smartMeterAgreement}
        render={({ field }) => (
          <InputLabel htmlFor={smartMeterAgreement.id} className={classes.textFormatting}>
            <Checkbox id={smartMeterAgreement.id} {...field} /> {smartMeterAgreement.label}
          </InputLabel>
        )}
      />

      <FormField
        id={directDebitAgreement.id}
        name="agreementSet.directDebitAgreement"
        validation={{ required: false }}
        errorSelector={(errors) => errors.agreementSet?.directDebitAgreement}
        render={({ field }) => (
          <InputLabel htmlFor={directDebitAgreement.id} className={classes.textFormatting}>
            <Checkbox id={directDebitAgreement.id} {...field} /> {directDebitAgreement.label}
          </InputLabel>
        )}
      />

      <Box display="flex" justifyContent={'center'} alignItems={'center'} className={classes.billieRoot}>
        <img src="/assets/img/Billie-green.png" width={'30%'} height={'auto'} />
      </Box>
    </>
  )
}
