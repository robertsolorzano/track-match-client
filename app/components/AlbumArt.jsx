import React from 'react';
import { Image, StyleSheet } from 'react-native';

const AlbumArt = ({ url }) => (
  <Image source={{ uri: url }} style={styles.albumCover} />
);

export default AlbumArt;

const styles = StyleSheet.create({
  albumCover: {
    width: 75,
    height: 75, 
    borderRadius: 5, 
    marginRight: 10, 
  },
});
