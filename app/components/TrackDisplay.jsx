import React from 'react';
import { View } from 'react-native';
import TrackElement from './TrackElement';

const TrackDisplay = ({ data }) => {
  const {
    tracks,
    analysisSongs,
    relativeSongs,
    analysisNewTempoSongs,
    relativeNewTempoSongs,
    original, // Audio features of the original track
    originalTrack
  } = data;

  // Extract the ID of the original track
  const originalTrackId = originalTrack ? originalTrack.id : null;

  // Map to store audio features of all songs by their ID
  const audioFeaturesMap = new Map();
  
  // Set of IDs for all relative songs
  const relativeSongIds = new Set([...relativeSongs, ...relativeNewTempoSongs].map(song => song.id));

  // Populate the audioFeaturesMap with features from all songs
  [analysisSongs, relativeSongs, analysisNewTempoSongs, relativeNewTempoSongs].forEach((featureArray) => {
    featureArray.forEach((feature) => {
      if (feature && feature.id) {
        audioFeaturesMap.set(feature.id, feature);
      }
    });
  });

  // Filter out the original track from the tracks array to avoid duplicates
  const filteredTracks = tracks.filter(track => track.id !== originalTrackId);

  // Create TrackElement components for each track, excluding the original track
  const trackElements = filteredTracks.map((track) => {
    const audioFeatures = audioFeaturesMap.get(track.id);
    if (audioFeatures) {
      const isRelative = relativeSongIds.has(track.id);
      return <TrackElement key={track.id} track={track} audioFeatures={audioFeatures} isRelative={isRelative} />;
    }
    return null;
  });

  // Render the original track separately, ensuring it's included without duplication
  const originalTrackElement = originalTrack && original ? (
    <TrackElement key={originalTrack.id} track={originalTrack} audioFeatures={original} isRelative={false} isOriginal={true} />
  ) : null;

  return (
    <View>
      {originalTrackElement}
      {trackElements}
    </View>
  );
};

export default TrackDisplay;
