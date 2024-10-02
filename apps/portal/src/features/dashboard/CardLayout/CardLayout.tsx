import * as React from 'react'
import clsx from 'clsx'
import { MonthlyUsage } from '@watt/api-interface'
import { useSpacing } from '@watt/theme'
import { GREY_SHADES } from '@watt/theme'
import { InternetIcon } from '~/components/common/Icons/InternetIcon'
import { TelecomIcon } from '~/components/common/Icons/TelecomIcon'
import { WaterIcon } from '~/components/common/Icons/WaterIcon'
import { AutoRenewCard } from '~/features/dashboard/AutoRenewCard/AutoRenewCard'
import { ContactCard } from '~/features/dashboard/ContactCard/ContactCard'
import { EnergyCard } from '~/features/dashboard/EnergyCard/EnergyCard'
import { GasCard } from '~/features/dashboard/GasCard/GasCard'
import { UnavailableUtilitiesCard } from '~/features/dashboard/UnavailableUtilitiesCard/UnavailableUtilitiesCard'
import en from '~/i18n'
import { getCompanyDetailsThunk } from '~/store/reducers/account/extraReducers'
import { getUsageThunk } from '~/store/reducers/usage/extraReducers'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { useStyles } from './card.layout.styles'

export const gasSupplier = {
  img: {
    src: '/assets/img/providers/eon.png',
  },
}

export const CardLayout: React.FC = () => {
  const classes = useStyles()
  const [mb10] = useSpacing('mb10')
  const dispatch = useAppDispatch()
  const mpan = useAppSelector((state) => state.account.mpan)
  const electricityUsage: MonthlyUsage[] = useAppSelector((state) => state.usage.electricity?.usage) || []
  const gasTotalAnnualUsage = useAppSelector((state) => state.usage.gas?.contract.total_annual_usage)

  React.useEffect(() => {
    if (mpan) {
      // TODO (Stephen): @usage.get("/") isn't using this mpan value
      dispatch(getUsageThunk({ utilityType: 1, mpan }))
    }
    dispatch(getUsageThunk({ utilityType: 2 }))
  }, [mpan, dispatch])

  React.useEffect(() => {
    dispatch(getCompanyDetailsThunk())
  }, [dispatch])

  const sortedConsumption = [...electricityUsage].sort((a, b) => a.monthly_usage - b.monthly_usage)
  const maxConsumptionMonth = sortedConsumption[electricityUsage.length - 1]
  const minConsumptionMonth = sortedConsumption[0]

  return (
    <div className={clsx(classes.root, mb10)}>
      <div className={classes.contactAndRenewCard}>
        <ContactCard />
        <AutoRenewCard />
      </div>
      <div className={classes.energyCard}>
        <EnergyCard
          yearlyConsumption={electricityUsage}
          minConsumption={minConsumptionMonth}
          maxConsumption={maxConsumptionMonth}
        />
      </div>
      <div className={classes.gasCard}>
        <GasCard supplier={gasSupplier} annualTotalConsumption={gasTotalAnnualUsage} />
      </div>
      <div className={classes.unavailableUtilitiesParent}>
        <UnavailableUtilitiesCard
          title={en.dashboard.unavailableUtilitiesCards.water}
          Icon={<WaterIcon height="28" width="28" color={GREY_SHADES[400]} />}
        />
        <UnavailableUtilitiesCard
          title={en.dashboard.unavailableUtilitiesCards.telecom}
          Icon={<TelecomIcon height="28" width="28" color={GREY_SHADES[400]} />}
        />
        <UnavailableUtilitiesCard
          title={en.dashboard.unavailableUtilitiesCards.internet}
          Icon={<InternetIcon height="28" width="28" color={GREY_SHADES[400]} />}
        />
      </div>
    </div>
  )
}
