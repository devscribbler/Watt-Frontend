import * as React from 'react'
import { Box, Typography } from '@mui/material'
import { useSpacing } from '@watt/theme'
import Link from '~/components/common/Link/Link'
import en from '~/i18n'
import { GenericCard } from '../GenericCard/GenericCard'

export const ContactCard: React.FunctionComponent = () => {
  const [mb4, pr3] = useSpacing('mb4', 'pr3')

  return (
    <GenericCard boxProps={{ display: 'flex' }}>
      <Box flexGrow={1}>
        <Typography variant="h5" component="h2" className={mb4}>
          {en.dashboard.contactCard.title}
        </Typography>
        <Typography className={mb4} variant="body2">
          {en.dashboard.contactCard.subtitle}
        </Typography>
        <table cellSpacing="0" cellPadding="0">
          <tbody>
            <tr>
              <td>
                <Typography variant="subtitle1">{en.dashboard.contactCard.phone}</Typography>
              </td>
              <td>
                <Typography variant="subtitle2">
                  <Link color="inherit" underline="none" href={`tel:${en.dashboard.contactCard.phoneNumber}`}>
                    {en.dashboard.contactCard.phoneNumber}
                  </Link>
                </Typography>
              </td>
            </tr>
            <tr>
              <td className={pr3}>
                <Typography variant="subtitle1">{en.dashboard.contactCard.email}</Typography>
              </td>
              <td>
                <Typography variant="subtitle2">
                  <Link color="inherit" underline="none" href={`mailto:${en.dashboard.contactCard.emailAddress}`}>
                    {en.dashboard.contactCard.emailAddress}
                  </Link>
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>

      <Box>
        <img src="/assets/img/bill.png" height="100px" />
      </Box>
    </GenericCard>
  )
}
