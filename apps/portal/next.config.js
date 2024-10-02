/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const path = require('path')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  webpack5: true,
  webpack: function (config, { defaultLoaders }) {
    // Will allow transpilation of shared packages through tsonfig paths
    // @link https://github.com/vercel/next.js/pull/13542
    const resolvedBaseUrl = path.resolve(config.context, '../../')
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(tsx|ts|js|jsx)$/,
        include: [resolvedBaseUrl],
        use: defaultLoaders.babel,
        exclude: (excludePath) => {
          return /node_modules/.test(excludePath)
        },
      },
    ]
    return config
  },
}

// eslint-disable-next-line no-undef
module.exports = config
