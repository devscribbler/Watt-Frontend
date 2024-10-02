import * as React from 'react'
import { BarItemProps, ResponsiveBar } from '@nivo/bar'
import { MonthlyUsage } from '@watt/api-interface'
import { MONTHS } from '@watt/constants'

export type EnergyConsumptionDiagramProps = {
  energyConsumption: MonthlyUsage[] | null
  minConsumption: MonthlyUsage
  maxConsumption: MonthlyUsage
}

type ConsumptionDatum = {
  yearMonth: string
  consumption: number
  monthColor: string
}

export const EnergyConsumptionDiagram = ({
  energyConsumption = [],
  minConsumption,
  maxConsumption,
}: EnergyConsumptionDiagramProps) => {
  const defaultColor = '#e1eaff'
  const minValueColor = '#89be00'
  const maxValueColor = '#ef7771'

  let data: ConsumptionDatum[] = []

  if (energyConsumption) {
    data = energyConsumption.map((consumption) => {
      const yearMonth = consumption.year_month
      const monthlyUsage = consumption.monthly_usage

      const year = yearMonth.slice(0, 4)
      const month = yearMonth.slice(5, 7)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const formattedPeriod = `${MONTHS[month]}`

      const isMin = monthlyUsage === minConsumption.monthly_usage
      const isMax = monthlyUsage === maxConsumption.monthly_usage
      const monthColor = isMin ? minValueColor : isMax ? maxValueColor : defaultColor
      const orderProperty = new Date(`${year}-${month}`)

      return {
        formattedPeriod,
        orderProperty,
        yearMonth,
        consumption: monthlyUsage,
        monthColor,
      }
    })
  }

  return (
    <ResponsiveBar
      padding={0.4}
      colors={({ data }) => data[`monthColor`]}
      margin={{ top: 10, right: 0, bottom: 30, left: 40 }}
      enableLabel={false}
      barComponent={CustomBarComponent}
      axisLeft={{
        tickSize: 0,
        tickPadding: 0,
        tickRotation: 0,
        legend: 'kWh',
        legendPosition: 'middle',
        legendOffset: -30,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      data={data}
      keys={['consumption']}
      indexBy="formattedPeriod"
    />
  )
}

/*
  Basically we're creating a custom svg component that's like a rounded corner square but with only 2 rounded corners.
  We're doing this by creating two arcs, for each side of the top of the bar.
  To understand what all these mean, copy the generated path inside https://svg-path-visualizer.netlify.app/
 */
const CustomBarComponent = ({ bar: { x, y, width, height, color } }: BarItemProps<ConsumptionDatum>) => {
  const RADIUS = 8
  const LEFT_ARC = `a${RADIUS} ${RADIUS} 0 01${RADIUS}-${RADIUS}`
  const RIGHT_ARC = `a${RADIUS} ${RADIUS} 0 01${RADIUS} ${RADIUS}`

  const pathProps: React.SVGProps<SVGPathElement> = {
    d: `M0 0${LEFT_ARC}h${width - RADIUS}${RIGHT_ARC}v${height - RADIUS}H0V${height - RADIUS}z`,
    fill: color,
  }

  return <g transform={`translate(${x}, ${y + RADIUS})`}>{height !== 0 && <path {...pathProps} />}</g>
}
