module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    semi: ['error', 'always'],
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        singleline: {
          delimiter: 'semi',
        },
        multiline: {
          delimiter: 'semi',
        },
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  parser: 'vue-eslint-parser',
  ignorePatterns: ['components.d.ts'],
};
