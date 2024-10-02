# Quotation Tool

Frontend source code for Quotation tool app.

## Tech stack

- Next.js (https://nextjs.org/)
- React (https://reactjs.org/)
- Material-UI (https://material-ui.com/)
- Redux-toolkit (https://redux-toolkit.js.org/) - opinionated alternative to Redux created by the Redux team.

### Code quality

- Prettier - Opinionated code formatter (https://prettier.io/)

### Node package managers

It's very important to use the same node package manager. We use Yarn 1. There is a preinstall script in package.json that will force devs to use yarn and not npm / pnmp.
Documentation:
https://shift.infinite.red/yarn-1-vs-yarn-2-vs-npm-a69ccf0229cd
https://www.digitalocean.com/community/tutorials/nodejs-npm-yarn-cheatsheet

### Formatting

We use pretty-quick to format only the changed filed.

### Fetching data

We use redaxios (https://github.com/developit/redaxios) for fetching data from an API. Why not native fetch? We could have used native fetch but redaxios (which has axios' API design) has a great abstraction over fetch, which is something that needed to be done by us to keep code DRY.

## Development setup

### Prerequisites

- Install Node.js which includes Node Package Manager
- Install Yarn (https://yarnpkg.com/getting-started/install)

### Run Locally

Clone the project

```bash
  git clone https://github.com/watt/portal
```

Go to the project directory

```bash
  cd apps/quote
```

Install dependencies

```bash
  yarn
```

Start the server (in development mode)

```bash
  yarn run dev
```

## Conventions and coding standards

### Store

Please use `useAppDispatch` and `useAppSelector` instead of plain `useDispatch` and `useSelector` to get proper types.

```ts
import { useAppSelector } from '~/store/selectors'

// Simple, demonstrative example
const contactForm = useAppSelector((state) => state.account.contact)
```

### Promises

Try to use await/async when possible. [Use await/async instead of Promises](https://mathiasbynens.be/notes/async-stack-traces).

```ts
// Bad
const fetchAndDisplay = ({ url, element }) => {
  showLoadingSpinner()
  fetch(url)
    .then((response) => response.text())
    .then((text) => {
      element.textContent = text
    })
    .catch((error) => {
      element.textContent = error.message
    })
    .finally(() => {
      hideLoadingSpinner()
    })
}

// Good
const fetchAndDisplay = async ({ url, element }) => {
  showLoadingSpinner()
  try {
    const response = await fetch(url)
    const text = await response.text()
    element.textContent = text
  } catch (error) {
    element.textContent = error.message
  } finally {
    hideLoadingSpinner()
  }
}
```

Use `finally` to avoid code duplication and to semantically separate cleanup from the other parts.

If you need to run the `Promises` in parallel, use `Promise.all()` (or `Promise.race()`).

### Imports

The project is configured to support module path aliasing.
Use absolute imports instead of relative ones.

```ts
// Bad
import { Link } from '../../../../components/Link/Link'

// Good
import { Link } from '~/components/Link/Link'
```

#### Importing styles

```ts
// Bad
import styles from './component.styles'

// Good
import classes from './component.styles'
```

### Page components

Each page component should be named in the following format `${RouteName}Page`. For example, `/register` should have a component called `RegisterPage`

## Github Actions

Recomanded for actions to have a `timeout-minutes: 10`, avoiding to waste all free minutes ([link](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes))

## Contributing

Contributions are always welcomed!
