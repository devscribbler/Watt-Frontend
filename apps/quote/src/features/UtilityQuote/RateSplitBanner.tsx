import { Box } from '@mui/material'
import en from '~/i18n/en.json'
import { useAppSelector } from '~/store/selectors'
import { useStyles } from './RateSplitBanner.styles'

function joinLabels(labels: string[]): string {
  switch (labels.length) {
    case 0:
      return ''
    case 1:
      return labels[0]
    case 2:
      return `${labels[0]} and ${labels[1]}`
    default: {
      const last = labels.pop()
      return `${labels.join(', ')} and ${last}`
    }
  }
}

export function RateSplitBanner() {
  const classes = useStyles()

  const electricityStore = useAppSelector((state) => state.quotes.electricity)

  if (!electricityStore) {
    return null
  }

  const { day, night, weekend } = electricityStore.ratePercentage

  const labels = []

  if (day) {
    labels.push(`${Math.round(day)}%`)
  }

  if (night) {
    labels.push(`${Math.round(night)}%`)
  }

  if (weekend) {
    labels.push(`${Math.round(weekend)}%`)
  }

  const label = joinLabels(labels)

  if (labels.length > 1) {
    return (
      <Box fontStyle="italic" m={1} lineHeight={3} className={classes.italicText} fontSize={12.5}>
        {en.quoteInfo.estimateExplanation} {label}.
      </Box>
    )
  } else return null
}
