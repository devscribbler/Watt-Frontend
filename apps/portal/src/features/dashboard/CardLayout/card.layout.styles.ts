import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
    gridAutoFlow: 'row',
    gap: theme.spacing(10),
  },
  contactAndRenewCard: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridColumn: 'span 4 / span 4',
    gridRow: 'span 2 / span 2',
    gap: theme.spacing(10),
  },
  energyCard: { gridColumn: 'span 8 / span 8', gridRow: 'span 2 / span 2' },
  gasCard: { gridColumn: 'span 4 / span 4' },
  unavailableUtilitiesParent: {
    display: 'grid',
    gridColumn: 'span 8 / span 8',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: theme.spacing(10),
  },
}))
