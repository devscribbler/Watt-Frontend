import { ButtonBase } from '@mui/material'
import { withStyles } from '@mui/styles'
import { SECONDARY_COLORS } from '@watt/theme'
import en from '~/i18n'
import { useStyles } from './compare.prices.button.styles'

export const CustomButton = withStyles({
  root: {
    paddingLeft: '0px',
    paddingRight: '0px',
    fontWeight: 'bold',
    color: SECONDARY_COLORS.main,
    fontSize: '1rem',
    textAlign: 'center',
  },
})(ButtonBase)

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  showComparison: boolean
  className?: string
  fullWidth?: boolean
}

export const ComparePricesButton = ({ onClick, showComparison, className }: Props): JSX.Element => {
  const classes = useStyles({ showComparison })
  const text = showComparison ? en.electricityQuote.hideComparison : en.electricityQuote.comparePrices

  return (
    <CustomButton onClick={onClick} className={className}>
      {text}
      <span className={classes.arrow} />
    </CustomButton>
  )
}
