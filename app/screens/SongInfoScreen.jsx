// screens/SongInfoScreen.jsx
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import DropdownMenu from '../components/DropdownMenu';
import AudioPlayer from '../components/AudioPlayer';
import TrackInfo from '../components/TrackInfo';
import TrackDetails from '../components/TrackDetails';
import AudioFeatures from '../components/AudioFeatures';
import AlbumArtFlip from '../components/AlbumArtFlip';
import { keyNumberToLetter, modeNumberToMusicalKey, timeNumberToFraction, msToTime } from '../utils/musicUtils';
import { db } from '../../firebaseConfig';
import { ref, push, query, orderByChild, equalTo, get } from 'firebase/database';
import { BlurView } from 'expo-blur';

const SongInfoScreen = ({ route }) => {
  const { track, audioFeatures } = route.params;
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const keySignature = `${keyNumberToLetter(audioFeatures.key)} ${modeNumberToMusicalKey(audioFeatures.mode)}`;
  const timeSignature = timeNumberToFraction(audioFeatures.time_signature);
  const tempo = audioFeatures.tempo.toFixed(2);
  const duration = msToTime(audioFeatures.duration_ms);
  const previewUrl = track.preview_url;

  const handleOptionsPress = () => {
    setDropdownVisible(true);
  };

  const handleSaveSong = async () => {
    try {
      const savedSongsRef = ref(db, 'savedSongs');
      const queryRef = query(savedSongsRef, orderByChild('track/id'), equalTo(track.id));
      const snapshot = await get(queryRef);

      if (!snapshot.exists()) {
        await push(savedSongsRef, { track, audioFeatures });
        console.log('Song saved to Firebase:', track.name);
      } else {
        console.log('Song already exists, not saving duplicate.');
      }
    } catch (error) {
      console.error('Error saving song: ', error);
    }
    setDropdownVisible(false);
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[{ zIndex: 1, width: '100%', position: 'absolute', top: 0 }, { backgroundColor: 'transparent' }]}>
        <BlurView intensity={100} style={{ position: 'absolute', width: '100%', height: '100%' }} />
        <CustomHeader onOptionsPress={handleOptionsPress} />
      </Animated.View>
      <Animated.ScrollView
        style={{ flex: 1, marginTop: 0 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        <View style={styles.container}>
          <AlbumArtFlip track={track} audioFeatures={audioFeatures} />
          <View style={styles.trackInfoContainer}>
            <TrackInfo track={track} />
            <AudioPlayer previewUrl={previewUrl} />
          </View>
          <TrackDetails keySignature={keySignature} timeSignature={timeSignature} tempo={tempo} duration={duration} />
          <AudioFeatures audioFeatures={audioFeatures} />
        </View>
      </Animated.ScrollView>
      <DropdownMenu isVisible={isDropdownVisible} onClose={() => setDropdownVisible(false)} onSave={handleSaveSong} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#ffffff',
  },
  trackInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default SongInfoScreen;
