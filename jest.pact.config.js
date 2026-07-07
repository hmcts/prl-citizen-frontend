module.exports = {
  roots: ['<rootDir>/src/test/pact'],
  testRegex: '(/src/test/pact/*|\\.test)\\.(ts|js)$',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup/load-test-env.js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
};
