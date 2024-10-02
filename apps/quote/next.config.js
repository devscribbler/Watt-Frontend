/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const path = require('path')
// eslint-disable-next-line no-undef
const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL

/**
 * @type {import('next').NextConfig}
 */
const config = {
  // We're offloading compression to Cloudfront. NextJS uses gzip compression,
  // whereas Cloudfront uses brotli which has a superior compression ratio.
  compress: false,
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  future: {
    webpack5: true,
  },
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
module.exports = {
  ...config,
  async redirects() {
    return [
      {
        source: '/see-contracts-portal',
        destination: `${PORTAL_URL}/contracts`,
        permanent: true,
      },
    ]
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
}
