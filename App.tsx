import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { DeckList } from './app/screens/DeckList';
import { Study } from './app/screens/Study';
import { Stats } from './app/screens/Stats';
import { Write } from './app/screens/Write';
import { useProgress } from './app/stores/useProgress';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DeckStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Decks" component={DeckList} />
      <Stack.Screen name="Study" component={Study} />
      <Stack.Screen name="Write" component={Write} options={{ title: 'Write Practice' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const loadProgress = useProgress(state => state.loadProgress);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'DeckStack') {
              iconName = focused ? 'albums' : 'albums-outline';
            } else {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="DeckStack"
          component={DeckStack}
          options={{ headerShown: false, title: 'Decks' }}
        />
        <Tab.Screen name="Stats" component={Stats} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
