module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.js'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    collectCoverage: true,
    coverageReporters: ['text', 'lcov'],
    testMatch: ['**/tests/**/*.test.js'],
  };