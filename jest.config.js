module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./test/setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|expo-secure-store)/)',
  ],
  moduleNameMapper: {
    '\\.json$': '<rootDir>/test/mocks/jsonMock.js'
  }
};
