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
    // @see: https://eslint.org/docs/latest/rules/
    'eslint:recommended',
    // @see: https://typescript-eslint.io/linting/typed-linting
    'plugin:@typescript-eslint/recommended-type-checked',
    // @see: https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
    'plugin:react-hooks/recommended',
    // @see: https://github.com/jsx-eslint/eslint-plugin-react
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    // @see: https://github.com/prettier/eslint-config-prettier
    'prettier',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    // Unused folders && files:
    '**/__*/**',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Personal preference:
    // @see: https://typescript-eslint.io/rules/camelcase & https://typescript-eslint.io/rules/naming-convention
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
    ],
  },
  settings: {
    react: {
      // @see https://github.com/jsx-eslint/eslint-plugin-react
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
};
