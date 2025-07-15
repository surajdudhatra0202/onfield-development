module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@style': './src/style',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@services': './src/services',
          '@types': './src/types',
          '@hooks': './src/hook',
          '@navigation': './src/navigation',
          '@constants': './src/constants',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
