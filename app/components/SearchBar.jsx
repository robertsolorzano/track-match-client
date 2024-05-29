import React, { useState, useRef } from 'react';
import { View, TextInput, Animated, StyleSheet, TouchableOpacity, Text, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({ searchText, setSearchText, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedWidth = useRef(new Animated.Value(0)).current; 

  // Function to handle the focus event
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  // Function to handle the cancel button press
  const handleCancel = () => {
    setIsFocused(false);
    setSearchText(''); // Clear the search input
    Keyboard.dismiss();
    Animated.timing(animatedWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  // Function to clear the input
  const clearInput = () => {
    setSearchText('');
  };

  // The interpolated width for the search bar
  const searchBarWidth = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['96%', '80%'] 
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchContainer, { width: searchBarWidth }]}>
        <Icon
          name="search"
          size={20}
          color="#303030"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for Artist or Song..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          returnKeyType="search"
          onFocus={handleFocus}
          onSubmitEditing={onSearch}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearInput} style={styles.clearIconContainer}>
            <Icon
              name="times-circle"
              size={18}
              color="#303030"
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      {isFocused && (
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 48,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 24,
    height: 40,
    left: 6,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#303030',
  },
  searchIcon: {
    zIndex: 10,
    marginLeft: 10,
  },
  clearIconContainer: {
    paddingRight: 10,
  },
  cancelButton: {
    padding: 10,
    marginLeft: 5,
  },
  cancelText: {
    fontWeight: 'bold',
  }
});
