import type { NextPage } from 'next'
import { LayoutWithSidebar } from '~/components/common/LayoutWithSidebar'
import { ChangePassword } from '~/features'
import { useAuthenticated } from '~/hooks/useAuthenticated'
import en from '~/i18n'

const ChangePasswordPage: NextPage = () => {
  const { loading } = useAuthenticated()

  return (
    <LayoutWithSidebar title={en.accountInfo.title} loading={loading}>
      <ChangePassword />
    </LayoutWithSidebar>
  )
}

export default ChangePasswordPage
