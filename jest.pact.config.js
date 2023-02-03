module.exports = {
  roots: ['<rootDir>/src/test/pact'],
  testRegex: '(/src/test/pact/*|\\.test)\\.(ts|js)$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
};
