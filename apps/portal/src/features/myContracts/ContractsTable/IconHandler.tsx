import { UtilityKindType } from '@watt/constants'
import { EnergyIcon, GasIcon, InternetIcon, TelecomIcon, WaterIcon } from '~/components/common/Icons'

interface Props {
  utility: UtilityKindType
}

export const IconHandler = ({ utility }: Props): JSX.Element => {
  switch (utility) {
    case 1:
      return <EnergyIcon width={30} height={30} />
    case 2:
      return <GasIcon width={30} height={30} />
    case 3:
      return <InternetIcon width={30} height={30} />
    case 4:
      return <TelecomIcon width={30} height={30} />
    case 5:
      return <WaterIcon width={30} height={30} />
    default:
      return <></>
  }
}
