import { Theme, Checkbox, FormControlLabel, Input } from '@mui/material'
import { withStyles } from '@mui/styles'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { GenericFormField } from '@watt/components'
import { MAX_COMMENTS_LENGTH } from '~/constants/directDebit'
import i18n from '~/i18n'
import { DirectDebitAccountInfoType } from '~/store/reducers/banking/bankingSlice'
import { formatAccountNumber, formatSortCode } from '~/utils/bankDetails'
import { CommentLengthLabel } from './CommentLengthLabel/CommentLengthLabel'
import { useStyles } from './DirectDebitPaymentForm.styles'

export type DirectDebitPaymentFormType = DirectDebitAccountInfoType & {
  signature: string
  isAuthorized: boolean
  termsAndConditions: boolean
  comments?: string
  contractViewed?: boolean
}

type Props = {
  formId: string
  onFormSubmit: (data: DirectDebitPaymentFormType) => void
}

export const formConfig = {
  id: 'contract-signing-form-id',
  contract: {
    bankName: {
      id: 'bank.name' as const,
      defaultValue: '',
      label: i18n.contractForm.bankName.label,
      disabled: false,
      inputProps: {
        type: 'text',
      },
    },
    accountHolderName: {
      id: 'account.holder.name' as const,
      defaultValue: '',
      label: i18n.contractForm.accountHolderName.label,
      disabled: false,
      inputProps: {
        type: 'text',
      },
    },
    accountNumber: {
      id: 'account.number' as const,
      defaultValue: '',
      label: i18n.contractForm.accountNumber.label,
      disabled: false,
      inputProps: {
        type: 'text',
      },
    },
    sortCode: {
      id: 'sort.code' as const,
      defaultValue: '',
      label: i18n.contractForm.sortCode.label,
      disabled: false,
      inputProps: {
        type: 'text',
      },
    },
    signature: {
      id: 'signature' as const,
      defaultValue: '',
      label: i18n.contractForm.signature.label,
      disabled: false,
      inputProps: {
        type: 'text',
      },
    },
    isAuthorized: {
      id: 'is.authorized' as const,
      defaultValue: false,
      label: i18n.contractForm.isAuthorized.label,
      disabled: false,
      inputProps: {
        type: 'checkbox',
      },
    },
    termsAndConditions: {
      id: 'terms.and.conditions' as const,
      defaultValue: false,
      label: i18n.contractForm.termsAndConditions.label,
      disabled: false,
      inputProps: {
        type: 'checkbox',
      },
    },
  },
}

export const DirectDebitPaymentForm = ({ formId, onFormSubmit }: Props): JSX.Element => {
  const { watch, handleSubmit } = useFormContext<DirectDebitPaymentFormType>()
  const value = watch('comments') || []
  const commentsLength = value.length

  const handleFormSubmit: SubmitHandler<DirectDebitPaymentFormType> = (data) => {
    onFormSubmit(data)
  }

  const classes = useStyles()

  return (
    <form id={formId} onSubmit={handleSubmit(handleFormSubmit)}>
      <GenericFormField<DirectDebitPaymentFormType>
        id="bankName"
        name="bankName"
        label="Bank name"
        validation={{ required: true }}
        errorSelector={(errors) => errors.bankName}
        render={({ field }) => <Input id="bankName" placeholder="Barclays" {...field} />}
      />
      <GenericFormField<DirectDebitPaymentFormType>
        id="accountHolderName"
        name="accountHolderName"
        label="Name of the account holder"
        validation={{ required: true }}
        errorSelector={(errors) => errors.accountHolderName}
        render={({ field }) => <Input id="accountHolderName" placeholder="John Doe" {...field} />}
      />
      {/* <Controller control={control} name="accountHolderName" rules={{ required }} render={renderAccountHolderName} /> */}
      <GenericFormField<DirectDebitPaymentFormType>
        id="accountNumber"
        name="accountNumber"
        label="Account number"
        validation={{ required: true }}
        errorSelector={(errors) => errors.accountNumber}
        render={({ field }) => (
          <Input
            id="accountNumber"
            inputProps={{
              inputMode: 'numeric',
            }}
            placeholder="90012345"
            {...field}
            onChange={(e) => field.onChange(formatAccountNumber(field?.value as string, e.target.value))}
          />
        )}
      />
      <GenericFormField<DirectDebitPaymentFormType>
        id="sortCode"
        name="sortCode"
        label="Sort code"
        validation={{ required: true }}
        errorSelector={(errors) => errors.sortCode}
        render={({ field }) => (
          <Input
            id="sortCode"
            placeholder="10-88-00"
            type="text"
            {...field}
            onChange={(e) => field.onChange(formatSortCode(field?.value as string, e.target.value))}
            value={field.value}
          />
        )}
      />
      <GenericFormField<DirectDebitPaymentFormType>
        id="signature"
        name="signature"
        label="Your signature"
        validation={{ required: true }}
        errorSelector={(errors) => errors.signature}
        render={({ field }) => (
          <Input id="signature" placeholder="John Doe" {...field} className={classes.signatureFont} />
        )}
      />

      <GenericFormField<DirectDebitPaymentFormType>
        id="comments"
        name="comments"
        label="Comments"
        validation={{ required: false }}
        errorSelector={(errors) => errors.comments}
        render={({ field }) => (
          <>
            <Input
              inputProps={{
                maxLength: MAX_COMMENTS_LENGTH,
              }}
              id="comments"
              placeholder="E.g. - current meter readings or desired direct debit date"
              {...field}
            />
            <CommentLengthLabel maxChars={MAX_COMMENTS_LENGTH} commentsLength={commentsLength} />
          </>
        )}
      />

      <GenericFormField<DirectDebitPaymentFormType>
        id="isAuthorized"
        name="isAuthorized"
        validation={{ required: true }}
        errorSelector={(errors) => errors.isAuthorized}
        render={({ field }) => (
          <CustomFormControlLabel
            control={<Checkbox color="primary" {...field} />}
            label="I confirm that I am authorized to sign this contract."
            labelPlacement="end"
            aria-required
          />
        )}
      />
      <GenericFormField<DirectDebitPaymentFormType>
        id="termsAndConditions"
        name="termsAndConditions"
        validation={{ required: true, minLength: 8, maxLength: 8 }}
        errorSelector={(errors) => errors.termsAndConditions}
        render={({ field }) => (
          <CustomFormControlLabel
            control={<Checkbox color="primary" {...field} />}
            label="I understand that from the signed price, Watt.co.uk will receive a commission of no more than 1p/unit."
            labelPlacement="end"
            aria-required
          />
        )}
      />
    </form>
  )
}

export const CustomFormControlLabel = withStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      alignItems: 'flex-start',
    },
    marginRight: 0,
  },
}))(FormControlLabel)
