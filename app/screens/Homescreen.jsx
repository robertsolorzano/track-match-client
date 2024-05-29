import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Track Match</Text>
        <Image source={require('../assets/FullLogo_Transparent_NoBuffer.png')} style={styles.logo} />
      </View>
      <Button
        title="Search Songs"
        onPress={() => navigation.navigate('Root', { screen: 'Search' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 280,
    marginBottom: 20,
  },
  title: {
    color: '#000000',
    fontSize: 55,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
