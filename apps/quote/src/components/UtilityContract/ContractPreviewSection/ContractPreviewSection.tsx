import { useCallback } from 'react'
import BookTwoTone from '@mui/icons-material/BookTwoTone'
import { Divider, FormHelperText, Grid, IconButton, Link, Typography } from '@mui/material'
import clsx from 'clsx'
import { DownloadIcon, useIsDesktop } from '@watt/components'
import en from '~/i18n'
import { useStyles } from './contract.preview.section'

type Props = {
  url: string
  contractViewed?: boolean
  onContractViewed?: () => void
}

const { electricityQuote } = en

export const ContractPreviewSection = ({ contractViewed, onContractViewed, url }: Props): JSX.Element => {
  const classes = useStyles()
  const isDesktop = useIsDesktop()

  const linkBorderClass = useCallback(() => {
    if (contractViewed === undefined) {
      return classes.neutralBorder
    } else if (contractViewed === true) {
      return classes.successBorder
    } else {
      return classes.errorBorder
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractViewed])

  return (
    <Grid className={classes.root} direction={isDesktop ? 'row' : 'column'}>
      <Grid container className={classes.downloadLeft} direction="row">
        <Grid item xs={3} md={4} lg={3}>
          <BookTwoTone />
        </Grid>
        <Grid item xs={9} md={8} lg={9}>
          <Typography variant="body2">{electricityQuote.pdfContractReader.title}</Typography>
          <Typography variant="caption">{electricityQuote.pdfContractReader.subtitle}</Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Divider orientation={isDesktop ? 'horizontal' : 'vertical'} className={classes.divider} />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.downloadButton}>
        <Link
          rel="noopener noreferrer"
          className={clsx(classes.downloadRightButton, linkBorderClass())}
          href={url}
          target="_blank"
          onClick={onContractViewed}
          data-test="test-form-button-view-pdf"
        >
          <IconButton className={classes.downloadButton}>
            <DownloadIcon fontSize={'small'} />
          </IconButton>
          {contractViewed === false && (
            <FormHelperText className={classes.downloadText} error>
              Please view PDF
            </FormHelperText>
          )}
        </Link>
      </Grid>
    </Grid>
  )
}
