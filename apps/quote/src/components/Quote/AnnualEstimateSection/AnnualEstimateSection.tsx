import { Box, Typography } from '@mui/material'
import clsx from 'clsx'
import { IconBox, SavingsIcon } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { PRIMARY_COLORS } from '@watt/theme'
import { formatCurrency } from '@watt/utils'
import en from '~/i18n'
import { useStyles } from './annual.estimate.section.styles'

type Props = {
  annualEstimate: number
}

export const AnnualEstimateSection = ({ annualEstimate }: Props): JSX.Element => {
  const [mr3] = useSpacing('mr3')
  const classes = useStyles()
  const formattedAnnualEstimate = formatCurrency(annualEstimate)

  return (
    <>
      <div className={classes.root}>
        <IconBox className={clsx(mr3)} height={60} width={60} bgcolor={PRIMARY_COLORS.main}>
          <SavingsIcon height={36} width={36} color={PRIMARY_COLORS.main} />
        </IconBox>
        <div className={classes.saveTextSection}>
          <Box>
            <Typography variant="h4" display="inline" className={clsx(classes.quotePrice)}>
              {formattedAnnualEstimate}/
            </Typography>
            <Typography variant="caption" className={clsx(classes.bold)}>
              {en.electricityQuote.savingsSection.year}
            </Typography>
          </Box>
        </div>
      </div>
    </>
  )
}
