import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@watt/components'
import { UTILITIES_KIND_PROPERTY_MAP, UtilityKindType } from '@watt/constants'
import en from '~/i18n'

const quotationToolUrl = process.env.NEXT_PUBLIC_QUOTATION_TOOL_URL

type Props = {
  utilityType: UtilityKindType
  status?: 'seeQuote' | 'seeContract'
}
export const GetQuoteButton = ({ utilityType, status }: Props): JSX.Element => {
  const router = useRouter()

  const handleClick = useCallback(() => {
    const utilityName = UTILITIES_KIND_PROPERTY_MAP[utilityType]
    let url = `${quotationToolUrl}/${utilityName}`

    if (status === 'seeQuote') {
      url = `${url}/quote`
    }
    router.replace(url)
  }, [router, status, utilityType])

  return (
    <Button variant="outlined" color="secondary" fullWidth onClick={handleClick}>
      {en.common.buttons.getAQuote}
    </Button>
  )
}
