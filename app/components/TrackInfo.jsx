// components/TrackInfo.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrackInfo = ({ track }) => (
  <View style={styles.trackInfoContainer}>
    <View style={styles.trackDetails}>
      <Text style={styles.trackTitle}>{track.name}</Text>
      <Text style={styles.artistName}>{track.artists.map((artist) => artist.name).join(', ')}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  trackInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackDetails: {
    marginRight: 40,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 200,
  },
  artistName: {
    fontSize: 18,
    color: '#313131',
    marginTop: 5,
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 200,
  },
});

export default TrackInfo;
