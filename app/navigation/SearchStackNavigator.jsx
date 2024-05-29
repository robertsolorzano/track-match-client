// SearchStackNavigator.jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import SongInfoScreen from '../screens/SongInfoScreen';

const Stack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchHome" component={SearchScreen} />
      <Stack.Screen name="SongInfoScreen" component={SongInfoScreen} />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
