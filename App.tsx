import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton, MD3LightTheme, Menu, PaperProvider } from 'react-native-paper';
import { KeyboardConfig } from './app/components/KeyboardConfig';
import Account from './app/screens/Account';
import Login from './app/screens/Auth/Login';
import SignUp from './app/screens/Auth/SignUp';
import { Congrats } from './app/screens/Congrats';
import { ConversationCategories } from './app/screens/ConversationCategories';
import { ConversationList } from './app/screens/ConversationList';
import { ConversationPractice } from './app/screens/ConversationPractice';
import Credits from './app/screens/Credits';
import Culture from './app/screens/CultureDynamic';
import DeckList from './app/screens/DeckList';
import Dictionary from './app/screens/Dictionary';
import MultipleChoice from './app/screens/MultipleChoice';
import NumbersWrite from './app/screens/NumbersWrite';
import Onboarding from './app/screens/Onboarding';
import Profile from './app/screens/Profile';
import Settings from './app/screens/Settings';
import { Stats } from './app/screens/Stats';
import Study from './app/screens/Study';
import { Write } from './app/screens/Write';
import { useAuth } from './app/stores/useAuth';
import { useLanguage } from './app/stores/useLanguage';
import { useProgress } from './app/stores/useProgress';
import { Colors } from './constants/Colors';

const Tab = createBottomTabNavigator();
const InnerStack = createStackNavigator();
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

function HeaderMenu({ navigation }: any) {
  const [visible, setVisible] = React.useState(false);
  const { logout } = useAuth();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="dots-vertical" size={22} onPress={openMenu} />}
      contentStyle={{ backgroundColor: '#ffffff', borderRadius: 12, elevation: 8 }}
    >
      <View style={styles.menuCard}>
        <TouchableOpacity style={styles.menuItem} onPress={() => { closeMenu(); navigation.getParent()?.navigate('Settings'); }}>
          <MaterialCommunityIcons name="cog" size={18} color="#0f172a" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />
        <TouchableOpacity style={styles.menuItem} onPress={() => { closeMenu(); navigation.getParent()?.navigate('Profile'); }}>
          <MaterialCommunityIcons name="bookmark-outline" size={18} color="#0f172a" />
          <Text style={styles.menuText}>Saved</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />
        <TouchableOpacity style={styles.menuItem} onPress={() => { closeMenu(); navigation.getParent()?.navigate('Credits'); }}>
          <MaterialCommunityIcons name="information-outline" size={18} color="#0f172a" />
          <Text style={styles.menuText}>Credits</Text>
        </TouchableOpacity>
        <View style={styles.menuDivider} />
        <TouchableOpacity style={styles.menuItem} onPress={async () => { closeMenu(); await logout(); }}>
          <MaterialCommunityIcons name="logout" size={18} color="#0f172a" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Menu>
  );
}

function DeckStack() {
  return (
    <InnerStack.Navigator
      screenOptions={({ navigation }: any) => ({ headerRight: () => <HeaderMenu navigation={navigation} /> })}
    >
      <InnerStack.Screen name="Decks" component={DeckList} />
      <InnerStack.Screen name="Study" component={Study} />
      <InnerStack.Screen name="Write" component={Write} options={{ title: 'Write Practice' }} />
      <InnerStack.Screen name="NumbersWrite" component={NumbersWrite} options={{ title: 'Numbers Practice' }} />
      <InnerStack.Screen name="Congrats" component={Congrats} />
    </InnerStack.Navigator>
  );
}

function ConversationsStack() {
  return (
    <InnerStack.Navigator
      screenOptions={({ navigation }: any) => ({ headerRight: () => <HeaderMenu navigation={navigation} /> })}
    >
      <InnerStack.Screen name="Categories" component={ConversationCategories} options={{ title: 'Conversation Categories' }} />
      <InnerStack.Screen name="ConversationList" component={ConversationList} options={({ route }: any) => ({ title: route.params?.title || 'Conversations' })} />
      <InnerStack.Screen name="ConversationPractice" component={ConversationPractice} options={({ route }: any) => ({ title: route.params?.title || 'Practice' })} />
    </InnerStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarActiveTintColor: Colors.light.tint,
        headerRight: () => <HeaderMenu navigation={navigation} />,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'DeckStack') return <Ionicons name={focused ? 'albums' : 'albums-outline'} size={size} color={color} />;
          if (route.name === 'Stats') return <MaterialCommunityIcons name="chart-bar" size={size} color={color} />;
          if (route.name === 'Dictionary') return <MaterialCommunityIcons name="book-open-page-variant" size={size} color={color} />;
          if (route.name === 'Conversations') return <MaterialCommunityIcons name="chat" size={size} color={color} />;
          if (route.name === 'MultipleChoice') return <MaterialCommunityIcons name="checkbox-multiple-choice" size={size} color={color} />;
          if (route.name === 'Culture') return <MaterialCommunityIcons name="earth" size={size} color={color} />;
          return null;
        },
        tabBarStyle: { paddingBottom: 6, height: 60, paddingHorizontal: 0 },
      })}
    >
      <Tab.Screen name="DeckStack" component={DeckStack} options={{ title: 'Decks', headerShown: false }} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Dictionary" component={Dictionary} />
      <Tab.Screen name="Conversations" component={ConversationsStack} options={{ title: 'Conversations', headerShown: false }} />
      <Tab.Screen name="MultipleChoice" component={MultipleChoice} options={{ title: 'Quiz' }} />
      <Tab.Screen name="Culture" component={Culture} />
    </Tab.Navigator>
  );
}

export default function App() {
  const loadProgress = useProgress(state => state.loadProgress);
  const { loadLanguage, hasChosenLanguage } = useLanguage();
  const { currentUser, hydrate } = useAuth();

  useEffect(() => {
    loadProgress();
    loadLanguage();
    hydrate();
  }, [loadProgress, loadLanguage, hydrate]);

  const theme = { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, surface: '#ffffff', onSurface: '#0f172a' } } as typeof MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <KeyboardConfig>
        <NavigationContainer>
          {!currentUser ? (
            <AuthStack.Navigator>
              <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            </AuthStack.Navigator>
          ) : !hasChosenLanguage ? (
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
              <RootStack.Screen name="Onboarding" component={Onboarding} />
            </RootStack.Navigator>
          ) : (
            <RootStack.Navigator>
              <RootStack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
              <RootStack.Screen name="Settings" component={Settings} options={{ headerTitle: 'Settings' }} />
              <RootStack.Screen name="Account" component={Account} options={{ headerTitle: 'Account' }} />
              <RootStack.Screen name="Profile" component={Profile} options={{ headerTitle: 'Saved' }} />
              <RootStack.Screen name="Credits" component={Credits} options={{ headerTitle: 'Credits' }} />
            </RootStack.Navigator>
          )}
        </NavigationContainer>
      </KeyboardConfig>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  menuCard: { paddingVertical: 6, paddingHorizontal: 8, minWidth: 170 },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10, paddingHorizontal: 6 },
  menuText: { color: '#0f172a', fontWeight: '600' },
  menuDivider: { height: 1, backgroundColor: '#e5e7eb' },
});


