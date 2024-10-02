import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { DEFAULT_BORDER_RADIUS, ERROR_COLORS, FONT_SIZES, GREY_SHADES } from '@watt/theme'

type Props = { error: boolean; disabled?: boolean }

export const useStyles = makeStyles((theme: Theme) => ({
  disableSpin: {
    /* Chrome, Safari, Edge, Opera */
    '&::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    /* Firefox */
    '&': {
      MozAppearance: 'textfield',
    },
  },
  root: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  borderNoRadius: {
    borderRadius: 0,
  },
  borderOnlyBottomRight: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  borderOnlyTopRight: {
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  profileClassInputStyle: {
    borderBottom: 0,
    borderRight: 0,
    borderLeft: 0,
  },
  distributorIdInputStyle: {
    borderRight: 0,
    borderLeft: 0,
  },
  meterTimeInputStyle: {
    borderRight: 0,
    borderBottom: 0,
  },
  meterPointIdNumberInputStyle: {
    borderRight: 0,
  },
  lineLossFactorInputStyle: {
    borderBottom: 0,
    borderTopRightRadius: DEFAULT_BORDER_RADIUS,
  },
  checkDigitValueInputStyle: {
    borderBottomRightRadius: DEFAULT_BORDER_RADIUS,
  },
  alignContentCenter: {
    textAlign: 'center',
  },
  inputAdornmentContainer: {
    position: 'relative',
    display: 'block',
    top: theme.spacing(12),
  },
  specialCharacterContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid',
    borderColor: (props: Props) => (props.error ? ERROR_COLORS.main : 'currentColor'),
    borderTopLeftRadius: DEFAULT_BORDER_RADIUS,
    borderBottomLeftRadius: DEFAULT_BORDER_RADIUS,
    backgroundColor: (props: Props) => (props.disabled ? GREY_SHADES[100] : '#ffffff'),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  specialCharacter: {
    fontSize: FONT_SIZES.h1,
  },
  inputsContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  adornmentClass: { position: 'absolute', top: 0, bottom: 0, right: 0, marginRight: theme.spacing(-10) },
  displayHidden: { display: 'none' },
}))
