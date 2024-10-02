import * as React from 'react'
import { Card, CardContent, CardActionArea, Typography } from '@mui/material'
import { Button } from '@watt/components'
import { useStyles } from './GetNotifiedCTA.styles'

type GetNotifiedProps = {
  onClick: () => void
}

export const GetNotifiedCTA: React.FC<GetNotifiedProps> = ({ onClick }) => {
  const styles = useStyles()
  return (
    <Card className={styles.root}>
      <CardContent className={styles.content}>
        <Typography variant="h5">Your contact is not due for renewal?</Typography>
        <Typography variant="subtitle1" className={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </CardContent>
      <CardActionArea className={styles.actionarea}>
        <Button className={styles.button} onClick={onClick} variant="outlined">
          Get notified
        </Button>
      </CardActionArea>
    </Card>
  )
}
