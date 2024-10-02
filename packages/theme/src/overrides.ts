import { Theme } from '@mui/material'
import { GREY_SHADES, SECONDARY_COLORS, ERROR_COLORS, PRIMARY_COLORS } from './palette'
import { FONT_SIZES } from './typography'

export const DEFAULT_BORDER_RADIUS = 8

export const overrides: Theme['components'] = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
  },
  MuiTooltip: {
    defaultProps: {
      arrow: true,
    },
    styleOverrides: {
      tooltip: {
        backgroundColor: SECONDARY_COLORS.main,
        fontSize: FONT_SIZES.subtitle1,
      },
      arrow: {
        color: SECONDARY_COLORS.main,
      },
      tooltipPlacementBottom: {
        '@media (min-width: 600px)': {
          margin: '8px 0', // confirmed with Designer
        },
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: FONT_SIZES.body1,
      },
    },
  },
  MuiInputLabel: {
    defaultProps: {
      shrink: true,
    },
    styleOverrides: {
      formControl: {
        position: 'static',
      },
      shrink: { transform: `translate(0, 0) scale(1)` },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        border: `1px solid ${GREY_SHADES[600]}`,
        'label + &': {
          marginTop: '8px',
        },
      },
      input: {
        '&:focus': {
          borderRadius: DEFAULT_BORDER_RADIUS,
        },
      },
      notchedOutline: {
        border: 'none',
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      outlined: {
        padding: '0.75rem 1rem',
      },
    },
  },
  MuiInput: {
    // https://github.com/mui-org/material-ui/blob/14d95615dd0b31c616abb760a29ec30a8fa9005f/packages/material-ui/src/Input/Input.js#L18
    defaultProps: {
      disableUnderline: true,
    },
    styleOverrides: {
      formControl: {
        'label + &': {
          marginTop: '8px',
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        overflow: 'hidden',
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        border: `1px solid ${GREY_SHADES[600]}`,
        maxWidth: '100%',
        background: `#fff`,
        fontWeight: 'bold',
        '&.Mui-disabled': {
          backgroundColor: GREY_SHADES[100],
          color: GREY_SHADES[500],
          fontWeight: 'normal',
          borderColor: GREY_SHADES[300],
        },
        '&.Mui-error': {
          borderColor: ERROR_COLORS.main,
        },
      },
      input: {
        height: 'inherit',
        lineHeight: '1.5',
        padding: '0.75rem 1rem',
      },
      inputMultiline: {
        lineHeight: '1.5',
        padding: '0.5rem 1rem',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: DEFAULT_BORDER_RADIUS,
        padding: '6px 40px',
      },
      // label: {
      //   fontSize: typography.button?.fontSize,
      //   fontWeight: typography.button?.fontWeight,
      // },
      containedPrimary: { color: '#fff' },
      outlined: {
        background: '#ffffff',
        fontSize: FONT_SIZES.body1,
        fontWeight: 'bold',
        color: SECONDARY_COLORS.main,
      },
      contained: {
        background: PRIMARY_COLORS.main,
        fontSize: FONT_SIZES.body1,
        fontWeight: 'bold',
        color: 'white',
      },
      sizeSmall: {
        padding: '12px 12px',
        fontSize: '1rem',
        lineHeight: '16px',
      },
      text: {
        padding: '8px 12px',
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      vertical: {
        background: '#92959e',
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        fontSize: FONT_SIZES.subtitle1,
        height: '24px',
        textAlign: 'right',
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingRight: `16px`,
        paddingLeft: `16px`,
      },
    },
  },
}
