import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepperRoot: {
    padding: 0,
    width: '100%',
    justifyContent: 'center',
  },
  stepLabel: {
    color: theme.palette.secondary.main,
  },
  stepLabelActive: {
    fontWeight: 'bold',
  },
  stepIconRoot: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    color: theme.palette.common.white,
    border: `1px solid black`,
    borderRadius: `9999px`,
  },
  stepIconActive: {
    color: `${theme.palette.secondary.main}!important`,
    border: 'none',
  },
  stepIconCompleted: {
    color: theme.palette.primary.main,
    border: 'none',
  },
  stepIconText: {
    fill: theme.palette.secondary.main,
  },
  stepIconTextCompleted: {
    fill: theme.palette.common.white,
  },
  circularProgressGray: {
    position: 'absolute',
    left: 0,
  },
  circleDeterminate: {
    strokeLinecap: 'round',
    color: theme.palette.grey[300],
  },
}))
