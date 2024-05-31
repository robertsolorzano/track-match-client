// components/AdditionalInfo.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const iconMap = {
  Energy: 'flash',
  Danceability: 'dance-ballroom',
  Instrumentalness: 'saxophone',
  Liveness: 'pulse',
  Acousticness: 'guitar-acoustic',
  Speechiness: 'microphone',
};

const AdditionalInfo = ({ audioFeatures }) => (
  <View style={styles.additionalInfoContainer}>
    {audioFeatures.energy > 0.6 && (
      <Text style={styles.additionalInfoText}>
        <MaterialCommunityIcons name={iconMap['Energy']} size={16} color="black" /> This track exudes lively energy, making it ideal for active pursuits.
      </Text>
    )}
    {audioFeatures.danceability > 0.8 && (
      <Text style={styles.additionalInfoText}>
        <MaterialCommunityIcons name={iconMap['Danceability']} size={16} color="black" /> Its rhythmic arrangement and infectious melody make it easy to tap and groove along.
      </Text>
    )}
    {audioFeatures.instrumentalness > 0.6 && (
      <Text style={styles.additionalInfoText}>
        <MaterialCommunityIcons name={iconMap['Instrumentalness']} size={16} color="black" /> This track is predominantly instrumental, providing a soothing ambiance.
      </Text>
    )}
    {audioFeatures.liveness > 0.6 && (
      <Text style={styles.additionalInfoText}>
        <MaterialCommunityIcons name={iconMap['Liveness']} size={16} color="black" /> It exhibits high liveness, giving you the feeling of being at a live concert.
      </Text>
    )}
    {audioFeatures.acousticness > 0.6 && (
      <Text style={styles.additionalInfoText}>
        <MaterialCommunityIcons name={iconMap['Acousticness']} size={16} color="black" /> With significant acoustic elements, this track offers a warm and natural sound.
      </Text>
    )}
    {audioFeatures.speechiness > 0.6 && (
      <Text style={styles.additionalInfoText}>
        <MaterialCommunityIcons name={iconMap['Speechiness']} size={16} color="black" /> It has a considerable amount of speechiness, featuring spoken words or vocals.
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  additionalInfoContainer: {
    marginTop: 10,
    paddingHorizontal: 40,
  },
  additionalInfoText: {
    textAlign: 'center',
  },
});

export default AdditionalInfo;
