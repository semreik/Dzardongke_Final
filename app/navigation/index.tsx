import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { DeckList } from '../screens/DeckList';
import { Study } from '../screens/Study';
import { Write } from '../screens/Write';
import { Stats } from '../screens/Stats';
import { Congrats } from '../screens/Congrats';
import { Dictionary } from '../screens/Dictionary';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StudyStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="DeckList" component={DeckList} options={{ title: 'Decks' }} />
    <Stack.Screen name="Study" component={Study} options={{ title: 'Study' }} />
    <Stack.Screen name="Write" component={Write} options={{ title: 'Write' }} />
    <Stack.Screen 
      name="Congrats" 
      component={Congrats} 
      options={{ 
        title: 'Congratulations',
        headerLeft: () => null // Disable back button
      }} 
    />
  </Stack.Navigator>
);

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'StudyTab') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Stats') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen 
          name="StudyTab" 
          component={StudyStack} 
          options={{ 
            title: 'Study',
            headerShown: false
          }} 
        />
        <Tab.Screen
          name="Stats"
          component={Stats}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-bar" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Dictionary"
          component={Dictionary}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book-open" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
