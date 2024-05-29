import React, { useRef } from 'react';
import { View, TextInput, Animated, StyleSheet, TouchableOpacity, Text, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const LibrarySearchBar = ({ searchText, setSearchText, toggleSortOrder }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const cancelButtonOpacity = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.parallel([
      Animated.timing(animatedWidth, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(cancelButtonOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      })
    ]).start();
  };

  const handleCancel = () => {
    setSearchText('');
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(animatedWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(cancelButtonOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      })
    ]).start();
  };

  const clearInput = () => setSearchText('');

  const searchBarWidth = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['85%', '70%'], // Adjust width to account for filter icon
  });

  const cancelButtonRight = cancelButtonOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0], // Adjust the starting and ending positions accordingly
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchContainer, { width: searchBarWidth }]}>
        <Icon name="search" size={20} color="#303030" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for Artist or Song..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          onFocus={handleFocus}
          onBlur={handleCancel}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearInput} style={styles.clearIconContainer}>
            <FontAwesomeIcon name="times-circle" size={18} color="#303030" />
          </TouchableOpacity>
        )}
      </Animated.View>
      <TouchableOpacity onPress={toggleSortOrder} style={styles.filterIconContainer}>
        <Icon name="filter-list" size={20} color="#303030" />
      </TouchableOpacity>
      <Animated.View style={[styles.cancelButton, { right: cancelButtonRight, opacity: cancelButtonOpacity }]}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 24,
    backgroundColor: '#fff',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#303030',
  },
  searchIcon: {
    marginRight: 10,
  },
  clearIconContainer: {
    marginLeft: 10,
  },
  cancelButton: {
    position: 'absolute',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 48,
  },
  cancelText: {
    fontWeight: 'bold',
    color: '#303030',
  },
  filterIconContainer: {
    position: 'absolute',
    right: 15,
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});

export default LibrarySearchBar;
