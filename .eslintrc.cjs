module.exports = {
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json']
  },
  plugins: ['@typescript-eslint']
}
