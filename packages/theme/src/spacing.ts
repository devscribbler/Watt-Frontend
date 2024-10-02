// TODO: (maks) should really export this out into a seperate hooks package if we end up with more hooks
import { useTheme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

export type SpacingType = 'm' | 'p'
type Position = 't' | 'r' | 'b' | 'l' | 'x' | 'y'
type SpacingValue = number
type SpacingArgument = `${SpacingType}${Position}${SpacingValue}`

export function useSpacing(...args: SpacingArgument[]) {
  if (!args.length) {
    throw new Error('No value provided')
  }
  const theme = useTheme()

  const generatedClasses: string[] = []

  for (let i = 0; i < args.length; i++) {
    const expression = args[i]
    const { spacingType, position, value } = extractSpacingElements(expression)
    const getStyle = AVAILABLE_POSITIONS(spacingType)
    const providedOption = getStyle[position]

    if (!providedOption) {
      throw new Error('Provided option is not valid')
    }

    const spacingValue = theme.spacing(value)
    const styles = providedOption(parseInt(spacingValue))
    const useStyles = makeStyles({ root: styles })
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles()
    generatedClasses.push(classes.root)
  }

  return generatedClasses
}

function extractSpacingElements(expression: string) {
  const spacingTypeRegex = /p|m/g
  const positionRegex = /t|r|b|l|x|y/g
  const numberRegex = /[0-9]+/g

  const matchedSpacingType = expression.match(spacingTypeRegex)
  const matchedNumbers = expression.match(numberRegex)
  const matchedPosition = expression.match(positionRegex)

  if (matchedNumbers === null || matchedSpacingType === null || matchedPosition === null) {
    throw new Error('Specified format does not corresponds with the needed format.')
  }

  const [formattedSpacingType] = matchedSpacingType
  const [formattedPosition] = matchedPosition
  const [formattedMatchedNumbers] = matchedNumbers

  const spacingType: SpacingType = formattedSpacingType as SpacingType
  const position: Position = formattedPosition as Position
  const value: SpacingValue = Number(formattedMatchedNumbers)

  return {
    spacingType,
    position,
    value,
  }
}

const AVAILABLE_POSITIONS = (typeOfAlignment: SpacingType) => {
  const typeOfSpacing = typeOfAlignment === 'm' ? 'margin' : 'padding'

  return {
    x: (spacingValue: number) => ({
      [`${typeOfSpacing}Left`]: spacingValue,
      [`${typeOfSpacing}Right`]: spacingValue,
    }),
    y: (spacingValue: number) => ({
      [`${typeOfSpacing}Top`]: spacingValue,
      [`${typeOfSpacing}Bottom`]: spacingValue,
    }),
    t: (spacingValue: number) => ({
      [`${typeOfSpacing}Top`]: spacingValue,
    }),
    b: (spacingValue: number) => ({
      [`${typeOfSpacing}Bottom`]: spacingValue,
    }),
    l: (spacingValue: number) => ({
      [`${typeOfSpacing}Left`]: spacingValue,
    }),
    r: (spacingValue: number) => ({
      [`${typeOfSpacing}Right`]: spacingValue,
    }),
  }
}

export default useSpacing
