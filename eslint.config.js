module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'error',
    'react-native/no-unused-styles': 'error',
  },
  ignorePatterns: ['/dist/*', '/build/*'],
};