// Platform-aware export to satisfy expo-router and avoid WASM on web.
import { Platform } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const impl = Platform.OS === 'web' ? require('./sqlite.web') : require('./sqlite.native');
export const openDb = impl.openDb;


