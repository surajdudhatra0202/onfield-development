module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' + // <== allow ESM transform for navigation
      '|react-navigation' +
      '|react-native-reanimated' +
      '|react-native-gesture-handler' +
      '|react-native-vector-icons' +
      ')/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
