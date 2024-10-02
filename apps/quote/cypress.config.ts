import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild'
import createBundler, { BuildOptions } from '@bahmutov/cypress-esbuild-preprocessor'
import { defineConfig } from 'cypress'

/**
 * Required for the preprocessor to be able to generate JSON reports after each run, and more,
 * @param on cypress events
 * @param config cypress config
 * @returns promise of cypress config
 */
async function setupCucumber(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config)

  return config
}

/**
 * Required to use esbuild
 * @param on cypress events
 * @param config cypress config
 * @returns cypress config
 */
function setupEsbuild(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Cypress.PluginConfigOptions {
  const esBuildUserOptions: BuildOptions = {
    plugins: [createEsbuildPlugin(config)],
  }

  const bundler = createBundler(esBuildUserOptions)
  on('file:preprocessor', bundler)

  return config
}

/**
 * Cypress configuration
 */
export default defineConfig({
  projectId: 'xq8nh1',
  viewportWidth: 1400,
  viewportHeight: 1000,
  e2e: {
    // Global options
    baseUrl: 'http://localhost:3000',
    port: 2000,
    redirectionLimit: 3,
    watchForFileChanges: true,

    downloadsFolder: 'cypress/downloads',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    screenshotOnRunFailure: false,
    video: false,

    specPattern: '**/*.feature',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config)

      // Setup cypress-cucumber-preprocessor
      await setupCucumber(on, config)

      setupEsbuild(on, config)

      // Make sure to return the config object as it might have been modified by the plugin.
      return config
    },
  },
  env: {
    headersBlocklist: [],
    ignoreDefaultBlocklist: true,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
