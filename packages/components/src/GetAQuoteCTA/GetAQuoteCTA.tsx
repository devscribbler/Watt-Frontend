import { Card, CardContent, CardActionArea, Typography, Box } from '@mui/material'
import { Button } from '@watt/components'
import { useStyles } from './GetAQuoteCTA.styles'

type GetAQuoteCTAProps = {
  onClick: () => void
  disabled?: boolean
}

export function GetAQuoteCTA({ onClick, disabled }: GetAQuoteCTAProps) {
  const styles = useStyles()

  return (
    <Card className={styles.root}>
      <CardContent className={styles.content}>
        <Typography className={styles.title} variant="h6">
          Interested in the cheapest offers available for you?
        </Typography>
        <Typography className={styles.subtitle} variant="subtitle1">
          Do you want to know how much you can <strong>save</strong> up?
        </Typography>
        <Typography className={styles.subtitle} variant="subtitle1">
          Happy with your current provider and just want to <strong>renew</strong> your contract?
        </Typography>
      </CardContent>
      <CardActionArea className={styles.actionarea} onClick={onClick}>
        <Box className={styles.buttonContainer}>
          <Button
            component="div"
            className={disabled ? styles.buttonDisabled : styles.buttonEnabled}
            disabled={disabled}
          >
            Get a quote
          </Button>
        </Box>
      </CardActionArea>
    </Card>
  )
}
