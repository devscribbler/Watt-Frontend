import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    width: 0,
    height: 0,
    borderLeft: `5px solid transparent`,
    borderRight: `5px solid transparent`,
    borderTop: `5px solid black`,
    marginLeft: theme.spacing(2),
    transform: ({ showComparison }: { showComparison: boolean }) => (showComparison ? `rotate(180deg)` : 'initial'),
  },
}))
