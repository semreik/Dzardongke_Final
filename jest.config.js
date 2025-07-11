module.exports = {
  preset: 'jest-expo/ios',
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|expo' +
      '|@expo' +
      '|@expo-google-fonts' +
      '|expo-.*' +
      '|@react-navigation)/)',
    'node_modules/ci-info/.*\\.json$'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.json$': 'identity-obj-proxy'
  },
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: {
        jsx: 'react'
      }
    }
  }
};
