import { ReactNode } from 'react'
import { TableCellProps } from '@mui/material'

export type TableColumns<T> = Array<{
  id: keyof T | string
  label: string | ReactNode
  additionalCellProps?: Partial<TableCellProps>
  sortable?: boolean
  modifier?: (data: T) => ReactNode | ReactNode
  align?: 'center' | 'left' | 'right'
}>

export interface TablePropTypes<T> {
  data: T[]
  columns: TableColumns<T>
  query?: string
  selectedRows?: string[]
  selectedRowColumnId?: keyof T
  clickableRows?: boolean
  border?: boolean
  pagination?: boolean
  onRowClick?: (row: Partial<T>, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
  orderByDefaultColumn?: string
}
