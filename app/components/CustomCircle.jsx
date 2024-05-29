import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Svg, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomCircle = ({ title, value }) => {
  const size = 55;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Use Animated.Value for animating properties
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  useEffect(() => {
    // Animate the stroke dash offset from full circumference to the correct value
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Listen to changes in animatedValue to set the strokeDashoffset
    animatedValue.addListener((v) => {
      const offset = circumference - circumference * v.value;
      setStrokeDashoffset(offset);
    });

    // Cleanup the listener
    return () => animatedValue.removeAllListeners();
  }, [value, circumference, animatedValue]);

  // Define icons for each audio feature using Material Community Icons
  const iconMap = {
    Energy: 'flash',
    Danceability: 'dance-ballroom',
    Instrumentalness: 'saxophone',
    Liveness: 'pulse',
    Acousticness: 'guitar-acoustic',
    Speechiness: 'microphone',
  };

  // Select icon based on title
  const icon = iconMap[title] || 'information-outline'; 

  return (
    <View style={styles.circleContainer}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#FF6C34" />
            <Stop offset="100%" stopColor="#FF4801" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={32} color="#000" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomCircle;

const styles = StyleSheet.create({
  circleContainer: {
    backgroundColor: '#ffffff', 
    width: 120,
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    position: 'absolute',
    top: '12%',
    left: '47%',
    transform: [{ translateX: -12 }, { translateY: -12 }], 
  },
  title: {
    marginTop: 10,
    fontSize: 12,
  },
});
