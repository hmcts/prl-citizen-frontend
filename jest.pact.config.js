module.exports = {
  roots: ['<rootDir>/src/test/pact'],
  testRegex: '(/src/test/pact/*|\\.test)\\.(ts|js)$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],

  moduleNameMapper: {
      "^axios$": "axios/dist/node/axios.cjs"
  },

  transformIgnorePatterns: ['<rootDir>/node_modules/(?!node-emoji|axios)'],
};
