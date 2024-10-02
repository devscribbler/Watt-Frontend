import { SingleQuoteType } from '../../quotes'

export const MOCK_ELECTRICITY_QUOTE_1: SingleQuoteType = {
  provider_id: '',
  contract_type: '1',
  annual_price: 1000,
  unit_rate: 50,
  day_unit_rate: 50,
  evening_unit_rate: 25,
  night_unit_rate: 25,
  weekend_unit_rate: 25,
  off_peak_unit_rate: 25,
  standing_charge: 10,
  duration: 1,
  end_date: '2022-12-31T11:59:00.000',
  is_comparison_provider: false,
  capacity_charge_kva: '10',
  price_guaranteed: 1200,
}

export const MOCK_ELECTRICITY_QUOTE_2: SingleQuoteType = {
  provider_id: '',
  contract_type: '1',
  annual_price: 850,
  unit_rate: 40,
  day_unit_rate: 40,
  evening_unit_rate: 25,
  night_unit_rate: 25,
  weekend_unit_rate: 25,
  off_peak_unit_rate: 25,
  standing_charge: 8,
  duration: 2,
  end_date: '2022-12-31T11:59:00.000',
  is_comparison_provider: false,
  capacity_charge_kva: '10',
  price_guaranteed: 1200,
}
