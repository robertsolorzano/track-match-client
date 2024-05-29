import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur'; 
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import { REACT_APP_SERVER_URL } from '@env';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    analysisSongs: [],
    relativeSongs: [],
    analysisNewTempoSongs: [],
    relativeNewTempoSongs: [],
    tracks: [],
    original: null,
    originalTrack: null
  });

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${REACT_APP_SERVER_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm: searchText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setSearchResults({
        analysisSongs: data.analysisSongs,
        relativeSongs: data.relativeSongs,
        analysisNewTempoSongs: data.analysisNewTempoSongs,
        relativeNewTempoSongs: data.relativeNewTempoSongs,
        tracks: data.tracks,
        original: data.original,
        originalTrack: data.originalTrack
      });
    } catch (error) {
      console.error('Error searching for tracks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={100} style={styles.blurContainer}>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={handleSearch}
        />
      </BlurView>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#999999" />
        </View>
      ) : (
        <SearchResults results={searchResults} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
