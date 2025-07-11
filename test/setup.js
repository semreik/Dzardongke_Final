// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useFocusEffect: jest.fn(),
}));

// Mock SecureStore
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
}));

// Mock Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'web',
}));

// Add custom matchers
expect.extend({
  toBeMastered(received) {
    return {
      pass: received.status === 'mastered',
      message: () => `expected card to be mastered`,
    };
  },
});

// Import testing-library extensions after Jest is ready
require('@testing-library/jest-native/extend-expect');
require('@testing-library/react-native/cleanup-after-each');
