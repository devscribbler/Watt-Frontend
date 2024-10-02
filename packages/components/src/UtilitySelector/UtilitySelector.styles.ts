import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: ({ selected, disabled }: { selected: boolean; disabled: boolean; desktop: boolean }) => ({
    height: '100%',
    width: '100%',
    boxShadow: theme.shadows[1],
    borderStyle: 'solid',
    borderColor: selected ? theme.palette.grey[400] : theme.palette.common.white,
    borderWidth: '2px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  }),
  cardHeader: ({ desktop }: { desktop: boolean }) => ({
    marginTop: desktop ? '1em' : undefined,
    display: 'flex',
    justifyContent: 'space-between',
  }),
  cardContent: {
    paddingLeft: '1.5em',
  },
  utilityTitle: {
    fontWeight: 'bold',
  },
  utilitySupplierCount: {},
  mobileCardContent: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  mobileUtilityContent: {
    flexDirection: 'column',
    paddingLeft: '0.5',
    width: '50%',
    height: '100%',
    flex: 2,
  },
  iconBoxStyle: {
    paddingRight: '1em',
  },
}))
