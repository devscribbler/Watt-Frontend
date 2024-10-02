import * as React from 'react'
import { ButtonProps, Container, Grid } from '@mui/material'
import { Button } from '@watt/components'
import { ButtonLoading, ButtonLoadingProps, FooterSticky, RightChevronIcon } from '@watt/components'
import { useIsDesktop } from '@watt/components'
import { useStyles } from './buttonBar.styles'

interface BottomBarProps {
  previousButtonProps?: ButtonProps
  nextButtonProps: ButtonLoadingProps
}

export const BottomBar: React.FunctionComponent<BottomBarProps> = ({ previousButtonProps, nextButtonProps }) => {
  const isDesktop = useIsDesktop()
  const classes = useStyles()
  const { buttonProps, ...rest } = nextButtonProps

  return (
    <FooterSticky>
      <Container>
        <Grid
          container
          spacing={isDesktop ? 10 : 0}
          justifyContent={isDesktop ? 'flex-end' : 'space-between'}
          alignItems="center"
        >
          <Grid item xs="auto">
            {previousButtonProps && (
              <Button
                size={isDesktop ? 'medium' : 'small'}
                variant="text"
                color="secondary"
                startIcon={<RightChevronIcon height={14} width={14} />}
                classes={{
                  startIcon: classes.startIcon,
                }}
                {...previousButtonProps}
              />
            )}
          </Grid>
          <Grid item xs="auto">
            <ButtonLoading
              buttonProps={{
                size: isDesktop ? 'medium' : 'small',
                type: 'submit',
                variant: 'contained',
                color: 'primary',
                endIcon: <RightChevronIcon height={14} width={14} />,
                ...buttonProps,
              }}
              {...rest}
            />
          </Grid>
        </Grid>
      </Container>
    </FooterSticky>
  )
}
