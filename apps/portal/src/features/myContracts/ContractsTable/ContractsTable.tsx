import { Typography } from '@mui/material'
import { differenceInMonths } from 'date-fns'
import { Contract } from '@watt/api-interface'
import { UTILITIES_NOT_AVAILABLE, UtilityKindType, UTILITY_TYPES } from '@watt/constants'
import { Table, TableColumns } from '~/components/common/Table'
import en from '~/i18n'
import { ContractWithProvider } from '~/store/reducers/contracts/contractsSlice'
import { formatDate } from '~/utils/date'
import { Actions } from './Actions'
import { GetQuoteButton } from './GetQuoteButton'
import { SeeQuoteButton } from './SeeQuoteButton'
import { Status } from './Status'
import { UnitRate } from './UnitRate'
import { Utility } from './Utility'

const generateRowsForUnavailableContracts = (availableContracts: Contract[]): { utilityType: UtilityKindType }[] => {
  const allUtilities = Object.keys(UTILITY_TYPES).map((u) => Number(u)) as unknown as UtilityKindType[]
  const utilities = availableContracts.map((contract) => contract.utility_type)
  const unavailableUtilities = allUtilities.filter((utility) => !utilities.includes(utility))

  return unavailableUtilities.map((utility) => ({ utilityType: utility }))
}

interface Props {
  contracts: ContractWithProvider[]
  handlePDF?: (x: string) => void
}

type TableRowGenericType = { utilityType: UtilityKindType; data?: ContractWithProvider }

export const ContractsTable = ({ contracts, handlePDF }: Props): JSX.Element => {
  const formattedContracts: TableRowGenericType[] = contracts.map((contract) => {
    return {
      utilityType: contract.contract.utility_type,
      data: contract,
    }
  })
  const data = [
    ...formattedContracts,
    ...generateRowsForUnavailableContracts(contracts.map(({ contract }) => contract)),
  ]

  const columnsMockedData: TableColumns<TableRowGenericType> = [
    {
      id: 'utility_type',
      label: 'Utility',
      modifier: (row: TableRowGenericType) => {
        const utilityType = row.data ? row.data.contract.utility_type : row.utilityType

        return <Utility utility_type={utilityType} />
      },
    },
    {
      id: 'id',
      label: 'Supplier',
      modifier: (row: TableRowGenericType) => {
        if (!row.data) {
          return null
        }

        return <Typography>{row.data.provider.name}</Typography>
      },
    },
    {
      id: 'quote.contract_type',
      label: 'Contract type',
      modifier: (row: TableRowGenericType) => {
        if (!row.data) {
          return null
        }

        const months = row.data.contract.quote.duration * 12
        return <Typography>{`${months} ${en.myContracts.months}`}</Typography>
      },
    },
    {
      id: 'start_date',
      label: 'Start date',
      modifier: (row: TableRowGenericType) => {
        if (!row.data) {
          return null
        }

        return <Typography>{formatDate(row.data.contract.start_date)}</Typography>
      },
    },
    {
      id: 'contract.end_date',
      label: 'End date',
      modifier: (row: TableRowGenericType) => {
        if (!row.data) {
          return null
        }
        return <Typography>{formatDate(row.data.contract.end_date)}</Typography>
      },
    },
    {
      id: 'quote.day_unit_rate',
      label: 'Unit rate',
      modifier: (row: TableRowGenericType) => {
        if (!row.data) {
          return null
        }
        return <UnitRate unitRate={row.data.contract.quote.day_unit_rate} />
      },
    },
    {
      id: 'is_signed',
      label: 'Status',
      modifier: (row: TableRowGenericType) => {
        if (!row.data) {
          return null
        }
        return <Status contract={row.data.contract} />
      },
    },
    {
      id: 'id',
      label: 'Actions',
      modifier: (row: TableRowGenericType) => {
        if (!row.data) {
          return null
        }

        return <Actions contract={row.data.contract} handlePDF={handlePDF} />
      },
    },
    // See quote, get a quote section
    {
      id: 'id',
      label: '',
      modifier: (row: TableRowGenericType) => {
        // Has Watt Contract
        if (row.data) {
          const now = new Date()
          const utilityType = row.data.contract.utility_type

          const isContractWaitingForApproval = row.data.contract.status === 1

          if (isContractWaitingForApproval) {
            return null
          }

          const isNotExpiredQuote = row.data.quote ? now < new Date(row.data.quote.expiration_date) : false

          if (isNotExpiredQuote) {
            return <SeeQuoteButton utilityType={utilityType} />
          } else {
            const isContractDueToRenewal = differenceInMonths(new Date(row.data.contract.end_date), now) < 12

            if (isContractDueToRenewal) {
              return <GetQuoteButton utilityType={utilityType} status="seeQuote" />
            } else {
              return <GetQuoteButton utilityType={utilityType} />
            }
          }
        } else {
          // No Watt Contract
          if (UTILITIES_NOT_AVAILABLE.includes(row.utilityType)) {
            return <Typography>{en.myContracts.comingSoon}</Typography>
          } else {
            return <GetQuoteButton utilityType={row.utilityType} />
          }
        }
      },
    },
  ]

  return <Table data={data} columns={columnsMockedData} />
}
