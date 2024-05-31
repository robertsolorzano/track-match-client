// components/TrackDetails.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrackDetails = ({ keySignature, timeSignature, tempo, duration }) => (
  <View style={styles.audioFeaturesGrid}>
    <View style={styles.featureContainer}>
      <Text style={styles.featureTitle}>Key</Text>
      <Text style={styles.featureValue}>{keySignature}</Text>
    </View>
    <View style={styles.featureContainer}>
      <Text style={styles.featureTitle}>Time Signature</Text>
      <Text style={styles.featureValue}>{timeSignature}</Text>
    </View>
    <View style={styles.featureContainer}>
      <Text style={styles.featureTitle}>Tempo</Text>
      <Text style={styles.featureValue}>{tempo} BPM</Text>
    </View>
    <View style={styles.featureContainer}>
      <Text style={styles.featureTitle}>Duration</Text>
      <Text style={styles.featureValue}>{duration}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  audioFeaturesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '90%',
  },
  featureContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    width: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  featureValue: {
    fontSize: 14,
    color: '#FF4801',
    textAlign: 'center',
  },
});

export default TrackDetails;
