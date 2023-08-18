module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  extends: [
    'eslint:recommended', // https://eslint.org/docs/latest/rules/
    'plugin:@typescript-eslint/recommended-type-checked', // https://typescript-eslint.io/linting/typed-linting
    'plugin:react-hooks/recommended', // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
    'plugin:react/recommended', // https://github.com/jsx-eslint/eslint-plugin-react
    'plugin:react/jsx-runtime', // https://github.com/jsx-eslint/eslint-plugin-react
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    // Personal preference:
    '**/__*/**',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort', '@tanstack/query'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Personal preference:
    // naming convention: https://typescript-eslint.io/rules/camelcase & https://typescript-eslint.io/rules/naming-convention
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-unused-vars': 0,
    // `simple-import-sort`: https://dev.to/julioxavierr/sorting-your-imports-with-eslint-3ped
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
  settings: {
    react: {
      // Linter will throw error text w/o this line: https://github.com/jsx-eslint/eslint-plugin-react
      version: 'detect',
    },
  },
};
