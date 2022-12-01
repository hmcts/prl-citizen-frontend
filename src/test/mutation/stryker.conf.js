module.exports = {
  tsconfigFile: 'tsconfig.json',
  reporters:
    [
      'clear-text',
      'progress',
      'html',
    ],
  htmlReporter: {baseDir: 'functional-output/mutation-assets'},
  coverageAnalysis: 'perTest',
  mutate:
    [
      'src/main/steps/**.ts',
    ],
  ignorePatterns: [
    '**',
    '!config/**',
    '!src/main/**',
    '!src/test/**',
    '!jest.config.js',
  ],
  testRunner: 'jest',
  jest: {
    'configFile': 'jest.config.js',
    'enableFindRelatedTests': true,
  },
  logLevel: 'debug',
};
