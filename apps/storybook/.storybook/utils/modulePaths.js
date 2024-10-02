const path = require('path')
const { NormalModuleReplacementPlugin } = require('webpack')

const TILDE_IMPORT_REGEX = /~\/.+/

/**
 * This contains a regex for each app, and a resolved path to its src directory
 */
const APPS = {
  QUOTE: {
    regex: /([\/\\]{1,2})apps([\/\\]{1,2})quote([\/\\]{1,2})/,
    path: path.resolve(__dirname, '../../../quote/src'),
  },
  PORTAL: {
    regex: /([\/\\]{1,2})apps([\/\\]{1,2})portal([\/\\]{1,2})/,
    path: path.resolve(__dirname, '../../../portal/src'),
  },
}

function getTildeReplacement(resource) {
  const importPath = resource.context

  if (APPS.QUOTE.regex.test(importPath)) {
    return APPS.QUOTE.path
  }

  if (APPS.PORTAL.regex.test(importPath)) {
    return APPS.PORTAL.path
  }

  return '~'
}

const getRequestReplacement = (resource) => resource.request.replace('~', getTildeReplacement(resource))

/**
 * A function to replace any `~/foo` imports with a fully-qualified file reference
 *
 * This is required because Storybook doesnt know what '~' is, due to it not being within
 * one of the quote/portal apps
 */
const tildeReplacementPlugin = new NormalModuleReplacementPlugin(TILDE_IMPORT_REGEX, function (resource) {
  resource.request = getRequestReplacement(resource)
})

module.exports = {
  APPS,
  tildeReplacementPlugin,
}
