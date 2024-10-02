const { APPS, tildeReplacementPlugin } = require('./utils/modulePaths')

/**
 * Storybook config
 */

module.exports = {
  stories: ['../../**/*.stories.@(js|jsx|ts|tsx)', '../../../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },

  /**
   * Customise webpack for Storybook
   */
  webpackFinal: async (config, { configType }) => ({
    ...config,
    resolve: {
      ...config.resolve,

      /**
       * Aliases for the app modules have to be assigned manually here
       */
      alias: {
        ...config.resolve.alias,
        '@watt/portal': APPS.PORTAL.path,
        '@watt/quote': APPS.QUOTE.path,
      },
    },
    plugins: [
      ...config.plugins,

      // register the plugin to make '~/foo' imports work in Stoyrbook
      tildeReplacementPlugin,
    ],
  }),
}
