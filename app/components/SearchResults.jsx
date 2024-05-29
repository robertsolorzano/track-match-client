import React from 'react';
import { ScrollView, View } from 'react-native';
import TrackDisplay from './TrackDisplay'; 

const SearchResults = ({ results }) => {
  const HEADER_HEIGHT = 100; 

  return (
    <ScrollView>
      {/* Transparent header placeholder that fixed blur issue */}
      <View style={{ height: HEADER_HEIGHT, backgroundColor: 'transparent' }} />
      <TrackDisplay data={results} />
    </ScrollView>
  );
};

export default SearchResults;