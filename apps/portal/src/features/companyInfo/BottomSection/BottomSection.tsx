import { Box, ButtonProps } from '@mui/material'
import { ButtonLoading } from '@watt/components'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { useAppSelector } from '~/store/selectors'
import { formConfig } from '../formConfig'
import { useStyles } from './bottom.section.styles'

// form property is used to trigger native HTML form submission
// https://github.com/react-hook-form/react-hook-form/issues/566#issuecomment-675515940

export const BottomSection = (): JSX.Element => {
  const [pl10] = useSpacing('pl10')
  const classes = useStyles()
  const loading = useAppSelector((state) => state.account.status === 'loading')
  const buttonProps: ButtonProps = {
    type: 'submit',
    variant: 'contained',
    color: 'primary',
    form: formConfig.id,
  }

  return (
    <Box className={classes.root}>
      <div className={pl10}>
        <ButtonLoading loading={loading} buttonProps={buttonProps}>
          {en.common.buttons.save}
        </ButtonLoading>
      </div>
    </Box>
  )
}
