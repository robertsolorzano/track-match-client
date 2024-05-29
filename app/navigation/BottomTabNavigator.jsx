// BottomTabNavigator.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Homescreen';
import SearchStackNavigator from './SearchStackNavigator';
import { Ionicons } from '@expo/vector-icons';
import LibraryStackNavigator from './LibraryStackNavigator'; 


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF4801',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: "Home",
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          headerShown: false,
        }}
      />
<Tab.Screen
  name="Library"
  component={LibraryStackNavigator}
  options={{ headerShown: false }}
/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
