import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@watt/components'
import { UTILITIES_KIND_PROPERTY_MAP, UtilityKindType } from '@watt/constants'
import en from '~/i18n'

const quotationToolBaseUrl = process.env.NEXT_PUBLIC_QUOTATION_TOOL_URL

type Props = {
  utilityType: UtilityKindType
}

export const SeeQuoteButton = ({ utilityType }: Props): JSX.Element => {
  const router = useRouter()

  const handleClick = useCallback(() => {
    const utilityName = UTILITIES_KIND_PROPERTY_MAP[utilityType]
    const url = `${quotationToolBaseUrl}/${utilityName}/quote`

    router.replace(url)
  }, [router, utilityType])

  return (
    <Button variant="contained" color="primary" fullWidth onClick={handleClick}>
      {en.common.buttons.seeQuote}
    </Button>
  )
}
