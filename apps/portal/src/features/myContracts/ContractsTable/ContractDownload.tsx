import * as React from 'react'
import { Link, Typography } from '@mui/material'
import { SECONDARY_COLORS } from '@watt/theme'
import { DownloadIcon } from '~/components/common/Icons'
import en from '~/i18n'
import { useStyles } from './contracts.styles'

interface Props {
  contractLink?: (pdf: string) => void
  contractId: string
}

export const ContractDownload: React.FunctionComponent<Props> = ({ contractLink, contractId }) => {
  const classes = useStyles()

  const downloadOnClick = React.useCallback(() => {
    if (contractLink) {
      contractLink(contractId)
    }
  }, [contractLink, contractId])

  return (
    <Link onClick={downloadOnClick} download="contract.pdf" underline="none">
      <div className={classes.container}>
        <DownloadIcon fill={SECONDARY_COLORS.main} />
        <Typography className={classes.downloadContractText}>
          {en.myContracts.downloadContract.toUpperCase()}
        </Typography>
      </div>
    </Link>
  )
}
