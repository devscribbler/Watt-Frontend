import type { NextPage } from 'next'
import { LayoutWithSidebar } from '~/components/common/LayoutWithSidebar'
import { ChangeEmail } from '~/features'
import { useAuthenticated } from '~/hooks/useAuthenticated'
import en from '~/i18n'

const ChangeEmailPage: NextPage = () => {
  const { loading } = useAuthenticated()

  return (
    <LayoutWithSidebar title={en.accountInfo.title} loading={loading}>
      <ChangeEmail />
    </LayoutWithSidebar>
  )
}

export default ChangeEmailPage
