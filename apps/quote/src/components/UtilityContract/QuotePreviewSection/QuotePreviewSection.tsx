import { Typography } from '@mui/material'
import { GenericUtilityQuote } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { GenericQuoteCard } from '~/components/Quote/GenericQuoteCard/GenericQuoteCard'

type Props = {
  selectedQuote: GenericUtilityQuote
}

export const QuotePreviewSection = ({ selectedQuote }: Props): JSX.Element => {
  const [mb8, mb4] = useSpacing('mb8', 'mb4')
  return (
    <div>
      <Typography variant="h5" component="h2" className={mb8}>
        Contract
      </Typography>
      <Typography className={mb4}>Offer summary</Typography>
      <GenericQuoteCard quote={selectedQuote} previewOnly />
    </div>
  )
}
