import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import TrackElement from '../components/TrackElement';
import LibrarySearchBar from '../components/LibrarySearchBar';

const LibraryScreen = ({ route }) => {
  const { folderSongs } = route.params || { folderSongs: [] };
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    if (folderSongs.length === 0) {
      loadSongs();
    }
  }, []);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const loadSongs = () => {
    const db = getDatabase();
    const savedSongsRef = ref(db, 'savedSongs');
    const unsubscribe = onValue(savedSongsRef, (snapshot) => {
      const data = snapshot.val();
      const savedSongs = data ? Object.values(data).map(item => ({
        track: item.track, 
        audioFeatures: item.audioFeatures 
      })) : [];
      setLikedSongs(savedSongs);
    });
    
    return () => unsubscribe();
  };

  // Sort and filter songs based on search query and tempo
  const sortedAndFilteredSongs = folderSongs
    .filter(song =>
      song.track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.track.artists.join('').toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const tempoA = a.audioFeatures.tempo;
      const tempoB = b.audioFeatures.tempo;
      return sortOrder === 'asc' ? tempoA - tempoB : tempoB - tempoA;
    });

  return (
    <View style={styles.container}>
      <LibrarySearchBar searchText={searchQuery} setSearchText={setSearchQuery} toggleSortOrder={toggleSortOrder} />
      <FlatList
        data={sortedAndFilteredSongs} 
        keyExtractor={(item) => item.track.id.toString()}
        renderItem={({ item }) => <TrackElement track={item.track} audioFeatures={item.audioFeatures} />}
        contentContainerStyle={styles.flatListContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flatListContentContainer: {
    marginTop: 0, 
  },
});

export default LibraryScreen;
