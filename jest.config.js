module.exports = {
  roots: ['<rootDir>/src/main'],
  testRegex: '(/src/test/.*|\\.test)\\.(ts|js)$',
  testEnvironment: 'node',
  preset: "ts-jest/presets/js-with-ts",
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: ['jest-extended', '<rootDir>/src/test/setup/load-test-env.js'],
  moduleNameMapper: {
    '@hmcts/nodejs-logging': '<rootDir>/src/test/unit/mocks/hmcts/nodejs-logging',
  },
  coverageThreshold: {
  },
  verbose: true,
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!node-emoji|axios|otplib|@otplib|@scure|query-string|sanitize-html|htmlparser2|deepmerge|escape-string-regexp|is-plain-object|parse-srcset|postcss|launder)',
  ],
};
