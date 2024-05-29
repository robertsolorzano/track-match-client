// LibraryStackNavigator.jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryDetailsScreen from '../screens/LibraryDetailsScreen';
import LibraryHomeScreen from '../screens/LibraryHomeScreen';
import SongInfoScreen from '../screens/SongInfoScreen';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LibraryHomeScreen"
        component={LibraryHomeScreen}
        options={{
          headerShown: true,
          headerTitle: "Library",
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={() => console.log('Settings pressed!')} style={styles.iconButton}>
                <Ionicons name="settings-outline" size={24} color="grey" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Logo pressed!')} style={styles.LogoButton}>
                <Ionicons name="ellipse" size={44} color="grey" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="LibraryDetailsScreen"
        component={LibraryDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: "My Songs",
          headerLeft: ({ onPress }) => (
            <TouchableOpacity onPress={onPress} style={{ marginLeft: 10 }}>
              <Ionicons name="chevron-back" size={30} color="#FF4801" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={() => console.log('Settings pressed!')} style={styles.iconButton}>
                <Ionicons name="settings-outline" size={24} color="grey" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Logo pressed!')} style={styles.LogoButton}>
                <Ionicons name="ellipse" size={44} color="grey" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen name="SongInfoScreen" component={SongInfoScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    marginRight: 0,
  },
  iconButton: {
    marginRight: 10,
    alignSelf: 'center',
  },
  LogoButton: {
    marginRight: 10,
  },
});

export default LibraryStackNavigator;
