import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DeckList } from './app/screens/DeckList';
import { Study } from './app/screens/Study';
import { Stats } from './app/screens/Stats';
import { Write } from './app/screens/Write';
import { Dictionary } from './app/screens/Dictionary';
import { useProgress } from './app/stores/useProgress';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';

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
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'DeckStack') {
                return <Ionicons name={focused ? 'albums' : 'albums-outline'} size={size} color={color} />;
              } else if (route.name === 'Stats') {
                return <MaterialCommunityIcons name="chart-bar" size={size} color={color} />;
              } else if (route.name === 'Dictionary') {
                return <MaterialCommunityIcons name="book-open" size={size} color={color} />;
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
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
