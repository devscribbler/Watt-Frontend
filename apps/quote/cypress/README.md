# Cypress Tests

Cypress is a test runner that runs in the browser. It is used to test the UI of the application. It is a great tool for end-to-end testing, component testing, and visual regression testing.

## Tech stack

- Cypress (https://www.cypress.io/)
- Cypress Testing Library (https://testing-library.com/docs/cypress-testing-library/intro/)
- Cypress Axe
- Cypress Code Coverage
- Cucumber (https://cucumber.io/)
- Gherkin (https://cucumber.io/docs/gherkin/)
- Cypress Cucumber Preprocessor (http://www.github.com/TheBrainFamily/cypress-cucumber-preprocessor)

## Development setup

### Prerequisites

Get the application running locally. See [README.md](../README.md) for instructions.

## Contributing

### Writing tests

1. Create a new feature file in the `cypress/features` folder. The file should be named after the page you are testing. For example, if you are testing the electricity usage page, the file should be named `electricity_usage.feature`.
2. Create a new step definition file in the `cypress/support/step_definitions` folder. The file should be named after the page you are testing. For example, if you are testing the electricity usage page, the file should be named `electricity_usage.ts`.
3. Give your elements human readable names. For example, if you have a button that says "Continue", name it `continue`.
4. Use the existing common step definitions as much as possible. If you need to create a new step definition, add it to the `cypress/support/step_definitions/common.ts` file.
5. Use the `data-test` attribute to select elements. If you need to add a `data-test` attribute to an element, add it to the `cypress/support/commands.ts` file.
6. Mocking API calls is not necessary. The application is configured to use the mock API by default. If you need to use a different mock then use `@fixture_file_name` to specify the fixture file to use. For example, if you need to use the `electricity_usage.json` fixture file, use `@fixture_electricity_usage`.
