import { forwardRef, useRef, useCallback, useMemo, ForwardRefRenderFunction } from 'react'
import { Grid, Input, Typography, FormControl } from '@mui/material'
import clsx from 'clsx'
import { useSpacing } from '@watt/theme'
import { validateLineLossFactorClass } from '@watt/utils'
import { MpanInputAdornment } from '../MpanInputAdornment'
import { useIsDesktop } from '../hooks/useIsDesktop'
import { useStyles } from './mpanInput.styles'

const MPAN_INPUTS_LENGTHS = {
  profileClass: 2,
  meterTime: 3,
  lineLossFactor: 3,
  distributorId: 2,
  meterPointIdNumber: 4,
  meterPointIdNumberPartTwo: 4,
  checkDigit: 3,
} as const

type Props = {
  onChange: (mpanValue: string) => void
  value: string
  id: string
  error: boolean
  disabled?: boolean
}

const MPAN_LENGTH = 21 as const

function convertStringMpanToStructuredMpan(mpan: string) {
  if (mpan.length !== MPAN_LENGTH) {
    return {
      profileClass: '',
      meterTime: '',
      lineLossFactor: '',
      distributorId: '',
      meterPointIdNumber: '',
      meterPointIdNumberPartTwo: '',
      checkDigit: '',
    }
  }

  return {
    profileClass: mpan.slice(0, 2),
    meterTime: mpan.slice(2, 5),
    lineLossFactor: mpan.slice(5, 8),
    distributorId: mpan.slice(8, 10),
    meterPointIdNumber: mpan.slice(10, 14),
    meterPointIdNumberPartTwo: mpan.slice(14, 18),
    checkDigit: mpan.slice(18, 21),
  }
}

const BaseMpanInput: ForwardRefRenderFunction<unknown, Props> = (props: Props, ref) => {
  const { onChange, value, id, error, disabled } = props
  const classes = useStyles({ error, disabled })
  const [mt2] = useSpacing('mt2')

  const mpanValue = useMemo(() => {
    const destructuredMpan = convertStringMpanToStructuredMpan(value)

    return destructuredMpan
  }, [value])

  const updateMpanSegment = useCallback(
    (update: Partial<typeof mpanValue>) => {
      const updatedMpan = { ...mpanValue, ...update }
      const updatedMpanString = Object.values(updatedMpan).join('')

      onChange(updatedMpanString)
    },
    [mpanValue, onChange]
  )

  const profileClassRef = useRef<HTMLInputElement>(null) // 1st
  const meterTimeRef = useRef<HTMLInputElement>(null) // 2nd
  const lineLossFactorRef = useRef<HTMLInputElement>(null) // 3rd
  const distributorIdRef = useRef<HTMLInputElement>(null) // 4th
  const meterPointIdNumberRef = useRef<HTMLInputElement>(null) // 5th
  const meterPointIdNumberPartTwoRef = useRef<HTMLInputElement>(null) // 5th part two
  const checkDigitRef = useRef<HTMLInputElement>(null) // 6th

  return (
    // @ts-expect-error Ref doesn't have correct typing
    <div className={clsx(classes.root, mt2)} ref={ref}>
      <div className={classes.specialCharacterContainer}>
        <Typography className={classes.specialCharacter}>S</Typography>
      </div>
      <div className={classes.inputsContainer}>
        <Grid container>
          <Grid item xs={4}>
            <FormControl fullWidth error={error} disabled={disabled}>
              <Input
                type={disabled ? 'text' : 'number'}
                id={id}
                fullWidth
                classes={{
                  root: clsx(classes.profileClassInputStyle, classes.borderNoRadius),
                  input: clsx(classes.disableSpin, classes.alignContentCenter),
                }}
                inputRef={profileClassRef}
                value={mpanValue.profileClass}
                inputProps={{
                  maxLength: MPAN_INPUTS_LENGTHS.profileClass,
                }}
                onChange={(e) => {
                  const { value } = e.target

                  if (value.length === MPAN_INPUTS_LENGTHS.profileClass) {
                    meterTimeRef.current?.focus()
                    meterTimeRef.current?.select()
                  }
                  if (value.length <= MPAN_INPUTS_LENGTHS.profileClass) {
                    updateMpanSegment({ profileClass: value })
                  }
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth error={error} disabled={disabled}>
              <Input
                type="text"
                fullWidth
                inputRef={meterTimeRef}
                value={mpanValue.meterTime}
                classes={{
                  root: clsx(classes.meterTimeInputStyle, classes.borderNoRadius),
                  input: clsx(classes.disableSpin, classes.alignContentCenter),
                }}
                inputProps={{
                  maxLength: MPAN_INPUTS_LENGTHS.meterTime,
                }}
                onChange={(e) => {
                  const { value } = e.target

                  if (value.length === MPAN_INPUTS_LENGTHS.meterTime) {
                    lineLossFactorRef.current?.focus()
                    lineLossFactorRef.current?.select()
                  }

                  if (value.length <= MPAN_INPUTS_LENGTHS.meterTime) {
                    updateMpanSegment({ meterTime: value })
                  }
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth error={error} disabled={disabled}>
              <Input
                type="text"
                fullWidth
                inputRef={lineLossFactorRef}
                value={mpanValue.lineLossFactor}
                inputProps={{
                  maxLength: MPAN_INPUTS_LENGTHS.lineLossFactor,
                }}
                classes={{
                  root: clsx(classes.lineLossFactorInputStyle, classes.borderOnlyTopRight),
                  input: clsx(classes.disableSpin, classes.alignContentCenter),
                }}
                onChange={(e) => {
                  const typedValue = e.target.value
                  const validatedValue = validateLineLossFactorClass(mpanValue.lineLossFactor, typedValue)

                  if (typedValue.length <= MPAN_INPUTS_LENGTHS.lineLossFactor) {
                    updateMpanSegment({
                      lineLossFactor: validatedValue,
                    })
                  }

                  if (validatedValue.length === MPAN_INPUTS_LENGTHS.lineLossFactor) {
                    distributorIdRef.current?.focus()
                    distributorIdRef.current?.select()
                  }
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3}>
            <FormControl fullWidth error={error} disabled={disabled}>
              <Input
                type={disabled ? 'text' : 'number'}
                fullWidth
                inputRef={distributorIdRef}
                value={mpanValue.distributorId}
                classes={{
                  root: clsx(classes.distributorIdInputStyle, classes.borderNoRadius),
                  input: clsx(classes.disableSpin, classes.alignContentCenter),
                }}
                inputProps={{
                  maxLength: MPAN_INPUTS_LENGTHS.distributorId,
                }}
                onChange={(e) => {
                  const { value } = e.target

                  if (value.length === MPAN_INPUTS_LENGTHS.distributorId) {
                    meterPointIdNumberRef.current?.focus()
                    meterPointIdNumberRef.current?.select()
                  }

                  if (value.length <= MPAN_INPUTS_LENGTHS.distributorId) {
                    updateMpanSegment({ distributorId: value })
                  }
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth error={error} disabled={disabled}>
              <Input
                type={disabled ? 'text' : 'number'}
                fullWidth
                inputRef={meterPointIdNumberRef}
                value={mpanValue.meterPointIdNumber}
                inputProps={{
                  maxLength: MPAN_INPUTS_LENGTHS.meterPointIdNumber,
                }}
                classes={{
                  root: clsx(classes.meterPointIdNumberInputStyle, classes.borderNoRadius),
                  input: clsx(classes.disableSpin, classes.alignContentCenter),
                }}
                onChange={(e) => {
                  const { value } = e.target

                  if (value.length === MPAN_INPUTS_LENGTHS.meterPointIdNumber) {
                    meterPointIdNumberPartTwoRef.current?.focus()
                    meterPointIdNumberPartTwoRef.current?.select()
                  }

                  if (value.length <= MPAN_INPUTS_LENGTHS.meterPointIdNumber) {
                    updateMpanSegment({ meterPointIdNumber: value })
                  }
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth error={error} disabled={disabled}>
              <Input
                type={disabled ? 'text' : 'number'}
                fullWidth
                inputRef={meterPointIdNumberPartTwoRef}
                value={mpanValue.meterPointIdNumberPartTwo}
                inputProps={{
                  maxLength: MPAN_INPUTS_LENGTHS.meterPointIdNumberPartTwo,
                }}
                classes={{
                  root: clsx(classes.meterPointIdNumberInputStyle, classes.borderNoRadius),
                  input: clsx(classes.disableSpin, classes.alignContentCenter),
                }}
                onChange={(e) => {
                  const { value } = e.target

                  if (value.length === MPAN_INPUTS_LENGTHS.meterPointIdNumberPartTwo) {
                    checkDigitRef.current?.focus()
                    checkDigitRef.current?.select()
                  }

                  if (value.length <= MPAN_INPUTS_LENGTHS.meterPointIdNumberPartTwo) {
                    updateMpanSegment({ meterPointIdNumberPartTwo: value })
                  }
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth error={error} disabled={disabled}>
              <Input
                type={disabled ? 'text' : 'number'}
                fullWidth
                inputRef={checkDigitRef}
                value={mpanValue.checkDigit}
                inputProps={{
                  maxLength: MPAN_INPUTS_LENGTHS.checkDigit,
                }}
                classes={{
                  root: clsx(classes.checkDigitValueInputStyle, classes.borderOnlyBottomRight),
                  input: clsx(classes.disableSpin, classes.alignContentCenter),
                }}
                onChange={(e) => {
                  const { value } = e.target

                  if (value.length <= MPAN_INPUTS_LENGTHS.checkDigit) {
                    updateMpanSegment({ checkDigit: value })
                  }
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <div className={useIsDesktop() ? classes.adornmentClass : classes.displayHidden}>
        <MpanInputAdornment />
      </div>
    </div>
  )
}

export const MpanInput = forwardRef(BaseMpanInput)
