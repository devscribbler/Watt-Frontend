import * as React from 'react'
import { useCallback } from 'react'
import { Card, CardContent, Typography, Checkbox } from '@mui/material'
import { addTestAttribute } from '@watt/utils'
import { IconBox } from '../IconBox/IconBox'
import { IconLookup } from '../Icons/IconLookup'
import { useIsDesktop } from '../hooks'
import { useStyles } from './UtilitySelector.styles'
import { UtilityType } from './UtilityType'
import { utilityDisplayLookup } from './utilityDisplayLookup'

type UtilitySelectorProps = {
  type: UtilityType
  supplierCount: number
  disabled: boolean
  onChange?: (checked: boolean) => void
}

export const UtilitySelector: React.FC<UtilitySelectorProps> = ({ type, supplierCount, disabled, onChange }) => {
  const [checked, setChecked] = React.useState(false)
  const utility = utilityDisplayLookup[type]
  const Icon = IconLookup[utility.icon]
  const desktop = useIsDesktop()
  const styles = useStyles({ selected: checked, disabled, desktop })

  const onClickCard = useCallback(() => {
    if (!onChange || disabled) {
      return
    }

    setChecked(!checked)
    onChange(!checked)
  }, [onChange, disabled, checked])

  return (
    <Card className={styles.root} onClick={onClickCard} {...addTestAttribute(`utility-selector-${type}`)}>
      {desktop ? (
        <>
          <CardContent className={styles.cardHeader}>
            <IconBox bgcolor={utility.iconBoxColor} width={50} height={50}>
              <Icon style={{ width: 35, height: 35 }} />
            </IconBox>
            {disabled ? (
              <Checkbox disabled />
            ) : (
              <div>
                <Checkbox color="secondary" checked={checked} />
              </div>
            )}
          </CardContent>
          <CardContent className={styles.cardContent}>
            <Typography variant="h5" className={styles.utilityTitle}>
              {utility.title}
            </Typography>
            <Typography variant="subtitle1" className={styles.utilitySupplierCount}>
              {disabled ? 'Coming soon' : `${supplierCount} suppliers`}
            </Typography>
          </CardContent>
        </>
      ) : (
        <>
          <CardContent className={styles.mobileCardContent}>
            <div className={styles.iconBoxStyle}>
              <IconBox bgcolor={utility.iconBoxColor} width={50} height={50}>
                <Icon style={{ width: 35, height: 35 }} />
              </IconBox>
            </div>
            <div className={styles.mobileUtilityContent}>
              <Typography variant="h5" className={styles.utilityTitle}>
                {utility.title}
              </Typography>
              <Typography variant="subtitle1" className={styles.utilitySupplierCount}>
                {disabled ? 'Coming soon' : `${supplierCount} suppliers`}
              </Typography>
            </div>
            {disabled ? <Checkbox disabled /> : <Checkbox color="secondary" checked={checked} />}
          </CardContent>
        </>
      )}
    </Card>
  )
}
