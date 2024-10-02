import { FlowStep, UtilityKindType } from '@watt/constants'
import { Step } from '~/components/Stepper/Stepper'
import { cfg } from '~/config/config'

const COMPANY_INFO_STEP = {
  index: 0,
  page: cfg.pages.companyInformation,
  label: 'Company information',
  state: 'active',
}

const ELECTRICITY_STEP_LIST: Step[] = [
  { index: 1, page: cfg.pages.electricity.usage, label: 'Electricity information', state: 'default' },
  { index: 2, page: cfg.pages.electricity.quote, label: 'Electricity quote', state: 'default' },
  { index: 3, page: cfg.pages.electricity.contract, label: 'Electricity contract', state: 'default' },
  { index: 4, page: cfg.pages.premium, label: 'Complete', state: 'default' },
]

const GAS_STEP_LIST: Step[] = [
  { index: 5, page: cfg.pages.gas.usage, label: 'Gas information', state: 'active' },
  { index: 6, page: cfg.pages.gas.quote, label: 'Gas quote', state: 'default' },
  { index: 7, page: cfg.pages.gas.contract, label: 'Gas contract', state: 'default' },
  { index: 8, page: cfg.pages.premium, label: 'Complete', state: 'default' },
]

type StepListByUtilityType = {
  [key in UtilityKindType]: Step[]
}
const STEP_LIST_BY_UTILITY: StepListByUtilityType = {
  1: ELECTRICITY_STEP_LIST,
  2: GAS_STEP_LIST,
  3: [],
  4: [],
  5: [],
}

// TODO: evaluate where these should go because i do not think here is the right place
type UTILITY_PAGE_MAP = {
  [t in UtilityKindType]: { [t in FlowStep]: string }
}

const UTILITY_PAGE_MAP: UTILITY_PAGE_MAP = {
  1: cfg.pages.electricity,
  2: cfg.pages.gas,
  3: cfg.pages.gas,
  4: cfg.pages.gas,
  5: cfg.pages.gas,
}

export const getPage = (utilityType: UtilityKindType, step: FlowStep) => {
  return UTILITY_PAGE_MAP[utilityType][step]
}

type GetStepsProps = {
  currentPage: string
  utilityTypes: UtilityKindType[]
}

export const getStepsBySelectedUtilityTypes = ({ currentPage, utilityTypes }: GetStepsProps): Step[] => {
  const newArray: Step[] = []

  const utilitySteps: { index: number; page: string; label: string }[] = [COMPANY_INFO_STEP]
  utilityTypes.forEach((utilityType) => {
    utilitySteps.push(...STEP_LIST_BY_UTILITY[utilityType])
  })
  const indexOfCurrentPage = utilitySteps.findIndex((step) => step.page === currentPage)

  utilitySteps.forEach((step) => {
    if (step.page === currentPage) {
      newArray.push({ ...step, state: 'active' })
    } else {
      newArray.push({ ...step, state: step.index < indexOfCurrentPage ? 'completed' : 'default' })
    }
  })
  return newArray
}
