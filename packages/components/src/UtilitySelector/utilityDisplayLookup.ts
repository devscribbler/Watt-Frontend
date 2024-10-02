import { IconType } from '../Icons'
import { UtilityType } from './UtilityType'

export const utilityDisplayLookup = {
  [UtilityType.ELECTRICITY]: {
    title: 'Electricity',
    icon: IconType.EnergyIcon,
    iconBoxColor: 'yellow',
  },
  [UtilityType.GAS]: {
    title: 'Gas',
    icon: IconType.GasIcon,
    iconBoxColor: 'red',
  },
  [UtilityType.WATER]: {
    title: 'Water',
    icon: IconType.WaterIcon,
    iconBoxColor: 'blue',
  },
  [UtilityType.TELEPHONE]: {
    title: 'Telecom',
    icon: IconType.TelecomIcon,
    iconBoxColor: 'gray',
  },
  [UtilityType.INTERNET]: {
    title: 'Internet',
    icon: IconType.InternetIcon,
    iconBoxColor: 'gray',
  },
}
