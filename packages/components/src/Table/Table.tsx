import { useState, PropsWithChildren, useMemo } from 'react'
import * as React from 'react'
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TablePagination,
  Table as MUITable,
  Box,
} from '@mui/material'
import clsx from 'clsx'
import { get } from 'lodash'
import { TablePropTypes } from '.'
import { Tooltip } from '../Tooltip'
import { useStyles } from './table.styles'

export const Table = <GenericData,>({
  data,
  columns,
  // query,
  selectedRows = [],
  selectedRowColumnId = '' as keyof GenericData,
  clickableRows,
  onRowClick,
  border,
  pagination = false,
  orderByDefaultColumn = '',
}: PropsWithChildren<TablePropTypes<GenericData>>): JSX.Element => {
  const classes = useStyles({ border })
  const [page, setPage] = React.useState(0)
  const rowsToShow = pagination ? 10 : 9999
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsToShow)
  const [orderBy, setOrderBy] = useState<string | number | symbol>(orderByDefaultColumn)
  const [order, setOrder] = useState<'asc' | 'desc' | undefined>('asc')

  const createSortHandler = (columnId: string | number | symbol) => () => {
    if (orderBy !== columnId) {
      setOrderBy(columnId)
      setOrder('asc')
    } else {
      setOrder((oldOrder) => (oldOrder === 'asc' ? 'desc' : 'asc'))
    }
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const orderedData = useMemo(() => {
    if (!orderBy) {
      return data
    }
    const asc = order === 'asc' ? 1 : -1
    const column = orderBy as keyof Partial<GenericData>
    return [...data].sort(function (a, b) {
      if (!a[column]) {
        return -1 * asc
      }
      if (!b[column]) {
        return asc
      }
      if (a[column] > b[column]) {
        return asc
      }
      if (b[column] > a[column]) {
        return -1 * asc
      }
      return 0
    })
  }, [data, orderBy, order])

  return (
    <Box className={classes.root} boxShadow={1}>
      <TableContainer className={classes.root}>
        <MUITable className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={`${column.id}${index}`}
                  {...column.additionalCellProps}
                  align={column.align || 'left'}
                  className={classes.tableHeadCell}
                >
                  {column.sortable ? (
                    <Tooltip title="Sort">
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : 'asc'}
                        onClick={createSortHandler(column.id)}
                      >
                        {column.label}
                        {orderBy === column.id ? (
                          <span style={{ display: 'none' }}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </Tooltip>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedData
              // .filter((row) =>
              //   Object.values(row).some((prop) => `${prop}`.toLowerCase().includes(query?.toLowerCase()))
              // )
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    hover
                    selected={selectedRows.includes(row[selectedRowColumnId] as never)}
                    className={clickableRows ? clsx(classes.clickableRow, classes.tableBodyRow) : classes.tableBodyRow}
                    onClick={(e) => clickableRows && onRowClick?.(row, e)}
                  >
                    {columns.map((column, cellIndex) => {
                      return (
                        <TableCell
                          key={cellIndex}
                          {...(column.additionalCellProps || {})}
                          align={column.align || 'left'}
                          classes={{ body: classes.tableBodyRow }}
                        >
                          {column.modifier ? column.modifier(row) : get(row, column.id)}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </MUITable>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={orderedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Box>
  )
}
