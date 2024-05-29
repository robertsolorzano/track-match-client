import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DropdownMenu = ({ isVisible, onSave }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={onSave} style={styles.menuItem}>
        <Text style={styles.menuItemText}>Save Song</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    right: 10,
    top: 100, 
    backgroundColor: 'white',
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DropdownMenu;
