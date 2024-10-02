module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start',
      startServerReadyPattern: 'started server',
      staticDistDir: './apps/quote/out',
      numberOfRuns: 1,
      settings: {
        skipAudits: [
          'canonical', // for staging sites this will always be incorrect
          'maskable-icon',
          'valid-source-maps',
          'unsized-images',
          'offline-start-url',
        ],
      },
      wait: 30000,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.5 }],
        'categories:accessibility': ['warn', { minScore: 0.5 }],
        'categories:best-practices': ['warn', { minScore: 0.5 }],
        'categories:seo': ['warn', { minScore: 0.5 }],
        'resource-summary:document:size': ['warn', { maxNumericValue: 2000 }],
        'resource-summary:stylesheet:size': ['warn', { maxNumericValue: 0 }],
        'resource-summary:font:size': ['warn', { maxNumericValue: 400 }],
        'resource-summary:third-party:count': ['warn', { maxNumericValue: 80 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    server: {},
  },
}
