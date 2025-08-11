import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DeckList from './app/screens/DeckList';
import Study from './app/screens/Study';
import { Stats } from './app/screens/Stats';
import { Write } from './app/screens/Write';
import NumbersWrite from './app/screens/NumbersWrite';
import Dictionary from './app/screens/Dictionary';
import { ConversationCategories } from './app/screens/ConversationCategories';
import { ConversationList } from './app/screens/ConversationList';
import { ConversationPractice } from './app/screens/ConversationPractice';
import { Congrats } from './app/screens/Congrats';
import { useProgress } from './app/stores/useProgress';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { RootStackParamList } from './app/navigation/types';
import Onboarding from './app/screens/Onboarding';
import { useLanguage } from './app/stores/useLanguage';
import Settings from './app/screens/Settings';
import MultipleChoice from './app/screens/MultipleChoice';
import Profile from './app/screens/Profile';

const Tab = createBottomTabNavigator();
const InnerStack = createStackNavigator();
const RootStack = createStackNavigator();

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
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'DeckStack') {
                  return <Ionicons name={focused ? 'albums' : 'albums-outline'} size={size} color={color} />;
                } else if (route.name === 'Stats') {
                  return <MaterialCommunityIcons name="chart-bar" size={size} color={color} />;
                } else if (route.name === 'Dictionary') {
                  return <MaterialCommunityIcons name="book-open" size={size} color={color} />;
                } else if (route.name === 'Conversations') {
                  return <MaterialCommunityIcons name="chat" size={size} color={color} />;
                }
                return null;
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
            <Tab.Screen name="Settings" component={Settings} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
