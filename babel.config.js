module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          tests: ['./tests/'],
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@components': './src/components',
          '@assets': './assets',
        },
      },
    ],
  ],
};
