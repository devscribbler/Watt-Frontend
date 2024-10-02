import { NextPage } from 'next'
import { LayoutWithSidebar } from '~/components/common/LayoutWithSidebar'
import { MyContractsSection } from '~/features/myContracts/MyContractsSection'
import { useAuthenticated } from '~/hooks/useAuthenticated'
import en from '~/i18n'

const ContractsPage: NextPage = () => {
  const { loading } = useAuthenticated()
  return (
    <LayoutWithSidebar title={en.accountInfo.title} loading={loading}>
      <MyContractsSection />
    </LayoutWithSidebar>
  )
}

export default ContractsPage
