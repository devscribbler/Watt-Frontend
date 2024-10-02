import { Typography } from '@mui/material'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useSpacing } from '@watt/theme'
import { CardLayout } from '~/features/dashboard/CardLayout/CardLayout'
import en from '~/i18n'

const IndexPage: NextPage = () => {
  const [pt16, pb10] = useSpacing('pt16', 'pb10')

  return (
    <>
      <Typography variant="h3" component="h1" className={clsx(pt16, pb10)}>
        {en.dashboard.title}
      </Typography>
      <CardLayout />
    </>
  )
}

export default IndexPage
