import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { keyNumberToLetter, modeNumberToMusicalKey } from '../utils/musicUtils';
import AlbumArtLayer from '../components/AlbumArtLayer';

const FoldersScreen = () => {
  const [folders, setFolders] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Key');

  useEffect(() => {
    loadFolders();
  }, [activeFilter]); // Re-load folders when activeFilter changes

  const groupSongsByKey = (songs) => {
    const foldersMap = {};
    songs.forEach(song => {
      const { key, mode } = song.audioFeatures;
      const folderName = `${keyNumberToLetter(key)} ${modeNumberToMusicalKey(mode)}`;
      if (!foldersMap[folderName]) {
        foldersMap[folderName] = [];
      }
      foldersMap[folderName].push(song);
    });
    return foldersMap;
  };

  const groupSongsByBPM = (songs) => {
    // Define BPM ranges
    const bpmRanges = ['0-59', '60-79', '80-99', '100-119', '120-139', '140-159', '160-179', '180+'];

    const foldersMap = {};

    songs.forEach(song => {
      const bpm = song.audioFeatures.tempo;
      let range = bpmRanges.find(range => {
        const [min, max] = range.split('-').map(Number);
        return bpm >= min && (max ? bpm <= max : true);
      }) || '180+';

      if (!foldersMap[range]) {
        foldersMap[range] = [];
      }
      foldersMap[range].push(song);
    });

    return foldersMap;
  };

  const loadFolders = () => {
    const db = getDatabase();
    const savedSongsRef = ref(db, 'savedSongs');
    onValue(savedSongsRef, (snapshot) => {
      const data = snapshot.val();
      const songs = data ? Object.values(data) : [];
      let foldersMap = {};

      if (activeFilter === 'Key') {
        foldersMap = groupSongsByKey(songs);

        // Custom sorting for key folders
        let sortedFolderNames = Object.keys(foldersMap);

        // Define the order of keys in the Western music scale
        // Define the order of keys in the Western music scale, including sharp keys
        const orderOfKeys = ['C Major', 'C Minor', 'C# Major', 'C# Minor', 'D Major', 'D Minor', 'D# Major', 'D# Minor', 'E Major', 'E Minor', 'F Major', 'F Minor', 'F# Major', 'F# Minor', 'G Major', 'G Minor', 'G# Major', 'G# Minor', 'A Major', 'A Minor', 'A# Major', 'A# Minor', 'B Major', 'B Minor'];

        
        sortedFolderNames = sortedFolderNames.sort((a, b) => {
          return orderOfKeys.indexOf(a) - orderOfKeys.indexOf(b);
        });

        const newFolders = sortedFolderNames.map(folderName => ({
          id: folderName,
          name: folderName,
          songs: foldersMap[folderName]
        }));
        setFolders(newFolders);
      } else if (activeFilter === 'BPM') {
        foldersMap = groupSongsByBPM(songs);

        // Custom sorting for BPM folders
        let sortedFolderNames = Object.keys(foldersMap);
        sortedFolderNames = sortedFolderNames.sort((a, b) => {
          // Handle '141+' as a special case
          if (a.includes('+')) return 1;
          if (b.includes('+')) return -1;

          const rangeA = a.split('-').map(Number);
          const rangeB = b.split('-').map(Number);

          return rangeA[0] - rangeB[0] || rangeA[1] - rangeB[1];
        });

        const newFolders = sortedFolderNames.map(folderName => ({
          id: folderName,
          name: folderName,
          songs: foldersMap[folderName]
        }));
        setFolders(newFolders);
      }
    });
  };


  const navigation = useNavigation();

  const handleFolderPress = (folder) => {
    navigation.navigate('LibraryDetailsScreen', { folderSongs: folder.songs });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Key" onPress={() => setActiveFilter('Key')} color={activeFilter === 'Key' ? '#FF4801' : 'grey'} />
        <Button title="BPM" onPress={() => setActiveFilter('BPM')} color={activeFilter === 'BPM' ? '#FF4801' : 'grey'} />
      </View>
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFolderPress(item)}>
            <View style={styles.folderItem}>
              {/* Album Art Container */}
              <View style={styles.albumArtStackContainer}>
                {item.songs.slice(0, 3).reverse().map((song, index) => (
                  <AlbumArtLayer
                    key={`${item.id}-${index}`}
                    albumArt={song.track.album.images.length > 0 ? song.track.album.images[0].url : ''}
                    zIndex={index}
                    translateX={6 * index}
                    translateY={6 * index}
                  />
                ))}
              </View>
              {/* Folder Info */}
              <View style={styles.folderInfo}>
                <Text style={styles.folderText}>{item.name}</Text>
                <Text style={styles.songCountText}>{item.songs.length} songs</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  folderInfo: {
    flexDirection: 'column',
    marginLeft: 100,
  },
  folderText: {
    fontSize: 18,
  },
  songCountText: {
    color: '#888',
  },
  albumArtStackContainer: {
    height: 80,
    marginRight: 10,
  },
});

export default FoldersScreen;
