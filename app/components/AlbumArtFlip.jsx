// components/AlbumArtFlip.jsx
import React, { useRef, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { keyNumberToLetter, modeNumberToMusicalKey, timeNumberToFraction, msToTime } from '../utils/musicUtils';
import AdditionalInfo from './AdditionalInfo';

const AlbumArtFlip = ({ track, audioFeatures }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const handlePress = () => {
    const toValue = isFlipped ? 0 : 1;
    setIsFlipped(!isFlipped);

    Animated.timing(rotateAnim, {
      toValue,
      duration: 800,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const frontRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  const frontOpacity = rotateAnim.interpolate({
    inputRange: [0, 0.45, 0.55, 1],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = rotateAnim.interpolate({
    inputRange: [0, 0.6, 0.7, 1],
    outputRange: [0, 0, 1, 1],
  });

  const key = `${keyNumberToLetter(audioFeatures.key)}`;
  const tempo = audioFeatures.tempo.toFixed(2);
  const timeSignature = audioFeatures.time_signature;

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
      <View>
        <Animated.View style={[styles.albumArt, { transform: [{ perspective: 1000 }, { rotateY: frontRotate }] }, { opacity: frontOpacity }]}>
          <Image source={{ uri: track.album.images[0].url }} style={StyleSheet.absoluteFill} />
        </Animated.View>
        <Animated.View style={[styles.albumArt, styles.backSide, { transform: [{ perspective: 1000 }, { rotateY: backRotate }] }, { opacity: backOpacity }]}>
          <View>
            <Text style={styles.descriptionText}>
              <Text style={styles.boldValue}>{`${track.name}`}</Text>
              <Text> by </Text>
              <Text style={styles.boldValue}>{`${track.artists.map(artist => artist.name).join(", ")}`}</Text>
              <Text> is a </Text>
              <Text style={styles.boldValue}>{`${modeNumberToMusicalKey(audioFeatures.mode)}`}</Text>
              <Text> track</Text>
              {` in the `}
              <Text>{`key of `}</Text>
              <Text style={styles.boldValue}>{`${key}`}</Text>
              {`. With a `}
              <Text>{`tempo of `}</Text>
              <Text style={styles.boldValue}>{`${tempo}`}</Text>
              {` and a `}
              <Text>{`time signature of `}</Text>
              <Text style={styles.boldValue}>{`${timeNumberToFraction(timeSignature)}`}</Text>
              {`, it spans `}
              <Text style={styles.boldValue}>{`${msToTime(audioFeatures.duration_ms)}`}</Text>
              {`.`}
            </Text>
            <AdditionalInfo audioFeatures={audioFeatures} />
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  albumArt: {
    width: 280,
    height: 280,
    borderRadius: 4,
    resizeMode: 'contain',
    marginTop: 50,
  },
  backSide: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  boldValue: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  additionalInfoContainer: {
    marginTop: 10,
    paddingHorizontal: 40,
  },
  additionalInfoText: {
    textAlign: 'center',
  },
});

export default AlbumArtFlip;
