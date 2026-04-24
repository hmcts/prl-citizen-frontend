module.exports = {
  roots: ['<rootDir>/src/main', '<rootDir>/src/test'],
  testRegex: '(/src/test/.*|\\.test)\\.(ts|js)$',
  testEnvironment: 'node',
  preset: "ts-jest/presets/js-with-ts",
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: ['jest-extended'],
  moduleNameMapper: {
    '@hmcts/nodejs-logging': '<rootDir>/src/test/unit/mocks/hmcts/nodejs-logging',
  },
  coverageThreshold: {
  },
  verbose: true,
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!node-emoji|axios|otplib|@otplib|@scure)'],
};
