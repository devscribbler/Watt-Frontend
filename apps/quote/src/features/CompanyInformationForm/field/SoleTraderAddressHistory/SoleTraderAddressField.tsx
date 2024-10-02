import React from 'react'
import { AddressHistory } from './AddressHistory'

export function SoleTraderAddressField() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  return <AddressHistory selectedIndex={selectedIndex} onChange={setSelectedIndex} />
}
