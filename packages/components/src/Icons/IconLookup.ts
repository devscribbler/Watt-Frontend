import { CloseIcon } from './CloseIcon'
import { DatepickerIcon } from './DatepickerIcon'
import { DealCompleted } from './DealCompleted'
import { DocumentIcon } from './DocumentIcon'
import { DownArrow } from './DownArrow'
import { DownloadIcon } from './DownloadIcon'
import { EnergyIcon } from './EnergyIcon'
import { GasIcon } from './GasIcon'
import { InfoIcon } from './InfoIcon'
import { InternetIcon } from './InternetIcon'
import { MenuIcon } from './MenuIcon'
import { MoreIcon } from './MoreIcon'
import { OngoingIcon } from './OngoingIcon'
import { RightChevronIcon } from './RightChevronIcon'
import { SavingsIcon } from './SavingsIcon'
import { StarIcon } from './StarIcon'
import { TelecomIcon } from './TelecomIcon'
import { TreeIcon } from './TreeIcon'
import { UpArrow } from './UpArrow'
import { WaterIcon } from './WaterIcon'
import { IconType } from './types'

export const IconLookup: Record<IconType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  [IconType.CloseIcon]: CloseIcon,
  [IconType.DatepickerIcon]: DatepickerIcon,
  [IconType.DealCompleted]: DealCompleted,
  [IconType.DocumentIcon]: DocumentIcon,
  [IconType.DownArrow]: DownArrow,
  [IconType.DownloadIcon]: DownloadIcon,
  [IconType.EnergyIcon]: EnergyIcon,
  [IconType.InfoIcon]: InfoIcon,
  [IconType.GasIcon]: GasIcon,
  [IconType.InternetIcon]: InternetIcon,
  [IconType.MenuIcon]: MenuIcon,
  [IconType.MoreIcon]: MoreIcon,
  [IconType.OngoingIcon]: OngoingIcon,
  [IconType.RightChevronIcon]: RightChevronIcon,
  [IconType.SavingsIcon]: SavingsIcon,
  [IconType.StarIcon]: StarIcon,
  [IconType.TelecomIcon]: TelecomIcon,
  [IconType.TreeIcon]: TreeIcon,
  [IconType.UpArrow]: UpArrow,
  [IconType.WaterIcon]: WaterIcon,
}
