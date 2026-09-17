const js = require('@eslint/js');
const { SourceCode } = require('eslint');
const tseslint = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const jest = require('eslint-plugin-jest');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

// eslint-plugin-import currently calls legacy token/comment helpers removed in ESLint 10.
if (!SourceCode.prototype.getTokenOrCommentAfter) {
  SourceCode.prototype.getTokenOrCommentAfter = function (node, skip = 0) {
    return this.getTokenAfter(node, { includeComments: true, skip });
  };
}

if (!SourceCode.prototype.getTokenOrCommentBefore) {
  SourceCode.prototype.getTokenOrCommentBefore = function (node, skip = 0) {
    return this.getTokenBefore(node, { includeComments: true, skip });
  };
}

// `ban-types` was removed in typescript-eslint v8. Keep existing disable comments
// valid until they can be removed from the source files independently.
const typescriptEslintPlugin = {
  ...tseslint,
  rules: {
    ...tseslint.rules,
    'ban-types': {
      meta: {
        schema: [],
        type: 'suggestion',
      },
      create: () => ({}),
    },
  },
};

module.exports = [
  {
    ignores: [
      'dist/**',
      'coverage/**',
      '**/*.d.ts',
      'src/main/public/**',
      'src/main/types/**',
      'jest.*config.js',
      'src/test/*/codecept.conf.js',
      'src/test/config.ts',
      '**/*.js',
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },
  js.configs.recommended,
  ...tseslint.configs['flat/recommended'].map(config =>
    config.plugins
      ? {
          ...config,
          plugins: { '@typescript-eslint': typescriptEslintPlugin },
        }
      : config
  ),
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...jest.environments.globals.globals,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
    },
    settings: {
      ...importPlugin.configs.typescript.settings,
      jest: {
        version: require('jest/package.json').version,
      },
    },
    plugins: {
      import: importPlugin,
      jest,
      prettier,
    },
    rules: {
      // Preserve the ESLint 8 recommended-rule baseline during the major upgrade.
      'no-constant-binary-expression': 'off',
      'no-empty-static-block': 'off',
      'no-new-native-nonconstructor': 'off',
      'no-unassigned-vars': 'off',
      'no-unused-private-class-members': 'off',
      'no-useless-assignment': 'off',
      'preserve-caught-error': 'off',
      ...importPlugin.configs.errors.rules,
      ...importPlugin.configs.warnings.rules,
      ...importPlugin.configs.typescript.rules,
      ...jest.configs['flat/recommended'].rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      curly: 'error',
      eqeqeq: 'error',
      'import/no-duplicates': 'error',
      'import/no-named-as-default': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: false,
            order: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
      'jest/prefer-to-have-length': 'error',
      'jest/valid-expect': 'off',
      'linebreak-style': ['error', 'unix'],
      'no-console': 'warn',
      'no-prototype-builtins': 'off',
      'no-return-await': 'error',
      'no-unneeded-ternary': [
        'error',
        {
          defaultAssignment: false,
        },
      ],
      'object-curly-spacing': ['error', 'always'],
      'object-shorthand': ['error', 'properties'],
      quotes: [
        'error',
        'single',
        {
          allowTemplateLiterals: false,
          avoidEscape: true,
        },
      ],
      semi: ['error', 'always'],
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: false,
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
        },
      ],
    },
  },
];
