// components/AudioFeatures.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomCircle from './CustomCircle';

const AudioFeatures = ({ audioFeatures }) => (
  <View style={styles.audioFeaturesCircle}>
    <CustomCircle title="Energy" value={audioFeatures.energy} />
    <CustomCircle title="Danceability" value={audioFeatures.danceability} />
    <CustomCircle title="Instrumentalness" value={audioFeatures.instrumentalness} />
    <CustomCircle title="Liveness" value={audioFeatures.liveness} />
    <CustomCircle title="Acousticness" value={audioFeatures.acousticness} />
    <CustomCircle title="Speechiness" value={audioFeatures.speechiness} />
  </View>
);

const styles = StyleSheet.create({
  audioFeaturesCircle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    marginTop: 8,
  },
});

export default AudioFeatures;
