module.exports = {
  projects: [
    // {
    //   displayName: 'backend',
    //   testEnvironment: 'node',
    //   'testMatch': ['<rootDir>/server/**/*.test.js']
    // },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/*.test.js'],
      "setupFiles": [
        "fake-indexeddb/auto"
      ]
    },
  ]
};