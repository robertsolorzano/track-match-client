import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const AlbumArtLayer = ({ albumArt, zIndex, translateY, translateX }) => {
  return (
    <View style={[styles.albumArtContainer, { zIndex, transform: [{ translateY }, { translateX }] }]}>
      <Image source={{ uri: albumArt }} style={styles.albumArt} />
    </View>
  );
};

const styles = StyleSheet.create({
  albumArtContainer: {
    position: 'absolute', 
  },
  albumArt: {
    width: 75,
    height: 75, 
    borderRadius: 5,
  },
});

export default AlbumArtLayer;
