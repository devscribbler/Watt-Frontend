import { useCallback, useRef } from 'react'
import { FormControl, Grid } from '@mui/material'
import clsx from 'clsx'
import { TrimmedInput } from '../TrimmedInput'
import { useStyles } from './MprnInput.styles'

type Props = {
  onChange: (mpanValue: string) => void
  value: string
  id: string
  error: boolean
  disabled?: boolean
}

const MPRN_INPUT_LENGTH_MAX = 11

export const MprnInput: React.FC<Props> = ({ id, error, disabled, value, onChange }: Props) => {
  const classes = useStyles()
  const refs = useRef<HTMLInputElement[]>([])

  const _onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newValue = value + event.target.value
    onChange(newValue)

    // if character is input and it's not the last one focus next input
    if (event.target.value !== '' && index < MPRN_INPUT_LENGTH_MAX - 1) {
      refs.current[index + 1].focus()
    }
  }

  const _onKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    // if backspace is pressed and there is a value, remove the last character
    if (event.key === 'Backspace') {
      onChange(value.slice(0, index))

      // if backspace is pressed focus previous input
      if (index > 0 && value[index] !== '') {
        refs.current[index - 1].focus()
      }
    }
  }

  const renderInputs = useCallback(() => {
    const inputs: React.ReactElement[] = []

    for (let i = 0; i < MPRN_INPUT_LENGTH_MAX; i += 1) {
      let className: string

      if (i === 0) {
        className = classes.inputLeft
      } else if (i === MPRN_INPUT_LENGTH_MAX - 1) {
        className = classes.inputRight
      } else {
        className = classes.inputMid
      }

      inputs.push(
        <Grid item xs={12 / MPRN_INPUT_LENGTH_MAX}>
          <FormControl fullWidth error={error} disabled={disabled}>
            <TrimmedInput
              id={id}
              numeric
              fullWidth
              value={value[i] || ''}
              className={clsx(className, classes.input)}
              inputProps={{ className: classes.input, maxLength: 1 }}
              placeholder="-"
              inputRef={(el: HTMLInputElement) => (refs.current[i] = el)}
              onChange={(event) => _onChange(event, i)}
              onKeyDown={(event) => _onKeyDown(event, i)}
            />
          </FormControl>
        </Grid>
      )
    }

    return inputs
  }, [disabled, error, id, value])

  return (
    <div className={classes.root}>
      <Grid container>{renderInputs()}</Grid>
    </div>
  )
}
