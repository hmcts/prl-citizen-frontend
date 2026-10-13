module.exports = {
  roots: ['<rootDir>/src/test/a11y'],
  testRegex: '(/src/test/.*|\\.test)\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
