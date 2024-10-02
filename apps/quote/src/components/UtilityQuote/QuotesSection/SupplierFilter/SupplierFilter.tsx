import React from 'react'
import { Sort, Tune } from '@mui/icons-material'
import { Checkbox, ClickAwayListener, Grid, Typography } from '@mui/material'
import { Provider } from '@watt/api-interface'
import { Button } from '@watt/components'
import { useArray, useIsDesktop, useToggle } from '@watt/components'
import { useStyles } from './SupplierFilter.styles'

type Props = {
  onChange: (list: Provider[]) => void
  providers: Provider[]
}

export function SupplierFilter({ onChange, providers }: Props) {
  const isDesktop = useIsDesktop()
  const classes = useStyles({ desktop: isDesktop })
  const [filterMenuState, toggleMenuState] = useToggle()
  const [selectedSuppliers, setSelectedSuppliers] = useArray<Provider>()

  const handleToggleSupplier = React.useCallback(
    (supplier: Provider) => {
      if (selectedSuppliers.includes(supplier)) {
        setSelectedSuppliers({ type: 'remove', value: supplier })
      } else {
        setSelectedSuppliers({ type: 'add', value: supplier })
      }
    },
    [selectedSuppliers, setSelectedSuppliers]
  )

  React.useEffect(() => {
    onChange(selectedSuppliers)
  }, [onChange, selectedSuppliers])

  return (
    <div>
      <Button onClick={toggleMenuState}>
        {filterMenuState ? <Tune /> : <Sort />}
        {isDesktop ? 'Filter by Supplier' : 'Supplier'}
      </Button>
      {filterMenuState && (
        <ClickAwayListener onClickAway={toggleMenuState}>
          <Grid container className={classes.root}>
            {providers.map((provider) => (
              <div className={classes.card} key={provider.id}>
                <Grid item xs={2}>
                  <Checkbox
                    checked={selectedSuppliers.includes(provider)}
                    onClick={() => handleToggleSupplier(provider)}
                  />
                </Grid>
                <Grid item xs={3} className={classes.supplierLogo}>
                  <img
                    className={classes.image}
                    src={`/assets/img/providers/${provider.logo_file_name}`}
                    alt={provider.name}
                  />
                </Grid>
                <Grid item xs={7} className={classes.supplierName}>
                  <Typography variant="body1">{provider.name}</Typography>
                </Grid>
              </div>
            ))}
          </Grid>
        </ClickAwayListener>
      )}
    </div>
  )
}
