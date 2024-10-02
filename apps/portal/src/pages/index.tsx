import { Typography } from '@mui/material'
import clsx from 'clsx'
import type { NextPage } from 'next'
import { useSpacing } from '@watt/theme'
import { LayoutWithSidebar } from '~/components/common/LayoutWithSidebar'
import { CardLayout } from '~/features/dashboard/CardLayout/CardLayout'
import { useAuthenticated } from '~/hooks/useAuthenticated'
import en from '~/i18n'

const IndexPage: NextPage = () => {
  const { loading } = useAuthenticated()
  const [pt16, pb10] = useSpacing('pt16', 'pb10')

  return (
    <LayoutWithSidebar title={en.dashboard.title} loading={loading}>
      <Typography variant="h3" component="h1" className={clsx(pt16, pb10)}>
        {en.dashboard.title}
      </Typography>
      <CardLayout />
    </LayoutWithSidebar>
  )
}

export default IndexPage
