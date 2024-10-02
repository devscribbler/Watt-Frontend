import { Done } from '@mui/icons-material'
import { Grid, IconButton, InputAdornment, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Button } from '@watt/components'
import { Tooltip } from '@watt/components'
import { TrimmedInput } from '@watt/components'
import { PRIMARY_COLORS } from '@watt/theme'
import { validEmailAddress } from '~/utils/reactHookFormRules'
import { CompanyDetailsForm, formConfig } from '../../formConfig'
import { FormField } from '../FormField'
import { useStyles } from './EmailInput.styles'
import { useEmailVerification } from './verification'

const { contactEmail, code } = formConfig.contact

export function EmailInput() {
  const { register, formState } = useFormContext<CompanyDetailsForm>()

  const {
    isLoading,
    verifyEmail,
    submitCode,
    emailVerified: verified,
    verificationCodeSent: verificationSent,
  } = useEmailVerification()

  const classes = useStyles({
    verified,
  })

  return (
    <div className={classes.root}>
      <div className={classes.topCard}>
        <input {...register('contact.verifiedEmail')} type="hidden" />

        <FormField
          id={contactEmail.id}
          name="contact.contactEmail"
          label={contactEmail.label}
          className={classes.formControl}
          validation={{ required: true, pattern: validEmailAddress }}
          errorSelector={(errors) => errors.contact?.contactEmail}
          render={({ field }) => (
            <TrimmedInput
              autoComplete="email"
              disabled={verified}
              id={contactEmail.id}
              {...contactEmail.inputProps}
              {...field}
              type="text"
              style={{ borderColor: verified ? `${PRIMARY_COLORS.main}` : '' }}
              endAdornment={
                verified && (
                  <InputAdornment position="end">
                    <Tooltip title="Email verified">
                      <IconButton>
                        <Typography className={classes.adornment}>
                          <Done />
                        </Typography>
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }
            />
          )}
        />
        {!verified && (
          <div>
            <Button disabled={verificationSent || isLoading} variant="contained" fullWidth onClick={verifyEmail}>
              {isLoading ? 'Sending...' : verificationSent ? 'Code sent' : 'Send Verification Email'}
            </Button>
            {Boolean(
              formState.errors.contact?.contactEmail ||
                (!verificationSent && formState.dirtyFields.contact?.contactEmail && formState.submitCount > 0)
            ) && (
              <div className={classes.emailVerifyErrorText}>
                <Typography variant="subtitle1" color="error">
                  Required information.
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>
      {verificationSent && (
        <div>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={8}>
              <FormField
                id={code.id}
                name="contact.code"
                label={code.label}
                validation={{ required: true }}
                errorSelector={(errors) => errors.contact?.code}
                render={({ field }) => (
                  <TrimmedInput id={code.id} {...code.inputProps} {...field} autoComplete="one-time-code" />
                )}
              />
            </Grid>
            <Grid item xs={4} className={classes.verifyBttn}>
              <Button
                className={classes.verifyBttnEl}
                variant="contained"
                color="primary"
                size="small"
                fullWidth
                onClick={submitCode}
              >
                Verify
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  )
}
