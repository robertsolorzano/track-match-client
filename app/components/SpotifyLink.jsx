import React from 'react';
import { TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';

const SpotifyLink = ({ url }) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)}>
    <Image
      style={styles.spotifyLogo}
      source={require('../assets/spotify-logo-png-7057.png')} 
    />
  </TouchableOpacity>
);

export default SpotifyLink;

const styles = StyleSheet.create({
  spotifyLogo: {
    width: 32, 
    height: 32, 
    marginLeft: 18,
    marginRight: 8,
  },
});
