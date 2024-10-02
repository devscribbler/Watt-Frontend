import { useCallback } from 'react';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import Warning from '@mui/icons-material/Warning';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Grid,
  Backdrop,
  Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useNextUtilityPage } from '~/hooks/useNextStep';
import en from '~/i18n';
import { setCurrentFlow } from '~/store/reducers/form/formSlice';
import { useAppDispatch } from '~/store/selectors';
import { useStyles } from './GenericError.styles';

const { errors } = en

export function GenericError() {
  const { push } = useRouter()
  const classes = useStyles()
  const { nextUtility, nextPage } = useNextUtilityPage()
  const dispatch = useAppDispatch()

  const redirectToHome = useCallback(() => {
    window.location.href = '/'
  }, [])

  const handleSubmit = useCallback(() => {
    if (nextUtility)
      dispatch(setCurrentFlow({ flow: nextUtility }))
    if (nextPage)
      push(nextPage)
  }, [nextPage, nextUtility, push, dispatch])

  return (
    <Backdrop open={true} className={classes.rootDiv}>
      <Grid container direction="column" style={{ display: 'flex', width: '100%', height: '100%' }}>
        <Grid item md={2}></Grid>
        <Grid container item xs direction="row">
          <Grid item md={4}></Grid>
          <Grid item xs>
            <Card className={classes.root}>
              <CardHeader
                className={classes.header}
                title={
                  <div className={classes.headerDiv}>
                    <Typography variant="h6">{errors.page.title}</Typography>
                    <IconButton onClick={redirectToHome}>
                      <Typography variant="h6">X</Typography>
                    </IconButton>
                  </div>
                }
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h6">
                  <Warning className={classes.warningIcon} />
                </Typography>
                <Typography variant="h6" color="secondary" className={classes.needToCallYou}>
                  <ImportantDevicesIcon className={classes.importantDevicesIcon} />
                  {errors.page.subtitle1}
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                  {errors.page.subtext1}
                </Typography>
                <Typography variant="subtitle2" color="secondary">
                  {errors.page.subtitle2}
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                  {errors.page.subtext2}
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                  {errors.page.subtext3}
                  <strong>{errors.page.slogan}</strong>
                </Typography>
                <div
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Typography variant="body2" color="secondary">
                    {errors.page.proceed}
                  </Typography>
                  <div className={classes.rootProceedContainer}>
                    <Button onClick={handleSubmit} disabled={!nextPage} className={classes.proceedContainer}>
                      {en.common.buttons.submit}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}></Grid>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </Backdrop>
  )
}
