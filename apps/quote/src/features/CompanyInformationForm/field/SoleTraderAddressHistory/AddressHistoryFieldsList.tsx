import React from 'react'
import { AddressHistoryField } from './AddressHistoryField'
import { useSoleTraderAddresses } from './useSoleTraderAddresses'

export function AddressHistoryFieldsList({
  selectedIndex,
  lastMoveInDate,
}: {
  selectedIndex: number
  lastMoveInDate: string | undefined
}) {
  const { fields } = useSoleTraderAddresses()

  const memoizedAddressHistoryFields = React.useMemo(() => {
    return fields.map((_: typeof fields[0], index: number) => (
      <div key={index}>
        <AddressHistoryField index={index} selectedIndex={selectedIndex} lastMoveInDate={lastMoveInDate} />
      </div>
    ))
  }, [fields, selectedIndex, lastMoveInDate])

  return <>{memoizedAddressHistoryFields}</>
}
