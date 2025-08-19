import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { PaperProvider, Menu, IconButton } from 'react-native-paper';
import { Congrats } from './app/screens/Congrats';
import { ConversationCategories } from './app/screens/ConversationCategories';
import { ConversationList } from './app/screens/ConversationList';
import { ConversationPractice } from './app/screens/ConversationPractice';
import Onboarding from './app/screens/Onboarding';
import Settings from './app/screens/Settings';
import MultipleChoice from './app/screens/MultipleChoice';
import Profile from './app/screens/Profile';
import Credits from './app/screens/Credits';
import Culture from './app/screens/CultureDynamic';
import DeckList from './app/screens/DeckList';
import Dictionary from './app/screens/Dictionary';
import NumbersWrite from './app/screens/NumbersWrite';
import { Stats } from './app/screens/Stats';
import Study from './app/screens/Study';
import { Write } from './app/screens/Write';
import { useLanguage } from './app/stores/useLanguage';
import { useProgress } from './app/stores/useProgress';
import { Colors } from './constants/Colors';

const Tab = createBottomTabNavigator();
const InnerStack = createStackNavigator();
const RootStack = createStackNavigator();

function HeaderMenu({ navigation }: any) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="menu" size={20} onPress={openMenu} />}
    >
      <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Settings'); }} title="Settings" />
      <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Profile'); }} title="Saved" />
      <Menu.Item onPress={() => { closeMenu(); navigation.navigate('Credits'); }} title="Credits" />
    </Menu>
  );
}

function DeckStack() {
  return (
    <InnerStack.Navigator>
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
    <InnerStack.Navigator>
      <InnerStack.Screen name="Categories" component={ConversationCategories} options={{ title: 'Conversation Categories' }} />
      <InnerStack.Screen 
        name="ConversationList" 
        component={ConversationList} 
        options={({ route }: any) => ({ title: route.params?.title || 'Conversations' })} 
      />
      <InnerStack.Screen 
        name="ConversationPractice" 
        component={ConversationPractice} 
        options={({ route }: any) => ({ title: route.params?.title || 'Practice' })} 
      />
    </InnerStack.Navigator>
  );
}

export default function App() {
  const loadProgress = useProgress(state => state.loadProgress);
  const { loadLanguage, hasChosenLanguage } = useLanguage();

  useEffect(() => {
    loadProgress();
    loadLanguage();
  }, [loadProgress, loadLanguage]);

  return (
    <PaperProvider>
      <NavigationContainer>
        {!hasChosenLanguage ? (
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Onboarding" component={Onboarding} />
          </RootStack.Navigator>
        ) : (
          <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
              tabBarActiveTintColor: Colors.light.tint,
              headerRight: () => <HeaderMenu navigation={navigation} />,
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'DeckStack') {
                  return <Ionicons name={focused ? 'albums' : 'albums-outline'} size={size} color={color} />;
                } else if (route.name === 'Stats') {
                  return <MaterialCommunityIcons name="chart-bar" size={size} color={color} />;
                } else if (route.name === 'Dictionary') {
                  return <MaterialCommunityIcons name="book-open-page-variant" size={size} color={color} />;
                } else if (route.name === 'Conversations') {
                  return <MaterialCommunityIcons name="chat" size={size} color={color} />;
                } else if (route.name === 'MultipleChoice') {
                  return <MaterialCommunityIcons name="checkbox-multiple-choice" size={size} color={color} />;
                } else if (route.name === 'Settings') {
                  return <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />;
                } else if (route.name === 'Profile') {
                  return <MaterialCommunityIcons name="account" size={size} color={color} />;
                } else if (route.name === 'Credits') {
                  return <MaterialCommunityIcons name="information" size={size} color={color} />;
                } else if (route.name === 'Culture') {
                  return <MaterialCommunityIcons name="earth" size={size} color={color} />;
                }
                return null;
              },
              tabBarStyle: {
                paddingBottom: 6,
                height: 60,
              },
            })}
          >
            <Tab.Screen
              name="DeckStack"
              component={DeckStack}
              options={{ headerShown: false, title: 'Decks' }}
            />
            <Tab.Screen name="Stats" component={Stats} />
            <Tab.Screen name="Dictionary" component={Dictionary} />
            <Tab.Screen 
              name="Conversations" 
              component={ConversationsStack} 
              options={{ headerShown: false, title: 'Conversations' }}
            />
            <Tab.Screen name="MultipleChoice" component={MultipleChoice} options={{ title: 'Quiz' }} />
            <Tab.Screen name="Settings" component={Settings} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="Profile" component={Profile} options={{ tabBarButton: () => null, title: 'Saved' }} />
            <Tab.Screen name="Credits" component={Credits} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="Culture" component={Culture} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
