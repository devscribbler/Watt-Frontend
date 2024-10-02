import { Hidden } from '@mui/material'
import { Typography } from '@mui/material'
import { EnergyIcon, IconBox, ProviderImage } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { UNCATEGORIZED_COLORS } from '@watt/theme'
import en from '~/i18n'
import { useStyles } from './energy.card.header'

type Props = {
  mpan: string
  supplierName: string
  supplierLogo: string
}

export const EnergyCardHeader = ({ mpan, supplierLogo, supplierName }: Props): JSX.Element => {
  const [mt2, ml4] = useSpacing('mt2', 'ml4')
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <IconBox bgcolor={UNCATEGORIZED_COLORS.yellow}>
          <EnergyIcon color={UNCATEGORIZED_COLORS.yellow} height="28" width="28" />
        </IconBox>
        <div className={ml4}>
          <Typography variant="h5" component="h2">
            {en.electricityInfo.energyCard.title}
          </Typography>
          {mpan && (
            <Typography variant="subtitle1" className={mt2}>
              {en.electricityInfo.energyCard.subtitle} {String(mpan).slice(-3)}
            </Typography>
          )}
        </div>
      </div>
      <div>
        <Hidden xsDown>
          <ProviderImage imageName={supplierLogo} className={classes.supplierLogo} />
        </Hidden>
        <Typography variant="subtitle1" className={mt2}>
          {supplierName}
        </Typography>
      </div>
    </div>
  )
}
