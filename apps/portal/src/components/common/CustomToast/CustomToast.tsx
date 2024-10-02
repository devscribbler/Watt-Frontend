import * as React from 'react'
import { CloseOutlined } from '@mui/icons-material'
import { Typography, Box, IconButton } from '@mui/material'
import clsx from 'clsx'
import { useSpacing } from '@watt/theme'
import { ERROR_COLORS, PRIMARY_COLORS, DEFAULT_BORDER_RADIUS } from '@watt/theme'
import { ErrorActionIcon } from '../Icons/ErrorActionIcon'
import { SuccessActionIcon } from '../Icons/SuccessActionIcon'

interface Props {
  severity: 'success' | 'error'
  children: React.ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function CustomToast({ severity, children, onClick }: Props): JSX.Element {
  const [py1, px2, py3, px3, ml4] = useSpacing('py1', 'px2', 'py3', 'px3', 'ml4')

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      bgcolor="#fff"
      borderRadius={DEFAULT_BORDER_RADIUS}
      className={clsx(py1, px2)}
      boxShadow={1}
    >
      <Box display="flex" flexShrink={0} className={clsx(py3, px3)}>
        {severity === 'success' ? (
          <SuccessActionIcon height={24} width={24} color={PRIMARY_COLORS.main} />
        ) : (
          <ErrorActionIcon height={24} width={24} color={ERROR_COLORS.main} />
        )}
      </Box>
      <Box display="flex" alignItems="center" flexGrow={1} flexShrink={1}>
        <Typography variant="subtitle2">{children}</Typography>
        <IconButton onClick={onClick} className={ml4}>
          <CloseOutlined height={24} width={24} />
        </IconButton>
      </Box>
    </Box>
  )
}
