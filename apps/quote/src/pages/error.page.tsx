import { NextPage } from 'next'
import { GenericError } from '~/components/Error/GenericError'
import { LayoutDefault } from '../components/LayoutDefault/LayoutDefault'

const ErrorPage: NextPage = () => {
  return (
    <LayoutDefault>
      <GenericError />
    </LayoutDefault>
  )
}

export default ErrorPage
