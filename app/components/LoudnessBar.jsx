// LoudnessBar.jsx might use later
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const LoudnessBar = ({ loudness, animate }) => {
  const maxLoudnessDb = 0;
  const minLoudnessDb = -60;
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animate) { 
      const targetHeight = ((loudness - minLoudnessDb) / (maxLoudnessDb - minLoudnessDb)) * 100;
      Animated.timing(animatedHeight, {
        toValue: targetHeight,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }
  }, [loudness, animate]); 

  return (
    <View style={styles.container}>
      <Text style={styles.loudnessLabel}>Loudness (dB)</Text>
      <View style={styles.barContainer}>
        <Svg height="100%" width="100%" viewBox="0 0 30 150" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#FF6C34" />
              <Stop offset="100%" stopColor="#FF4801" />
            </LinearGradient>
          </Defs>
          <AnimatedRect
            x="0"
            y={animatedHeight.interpolate({
              inputRange: [0, 100],
              outputRange: ['150', '0']
            })}
            width="30"
            height={animatedHeight.interpolate({
              inputRange: [0, 100],
              outputRange: ['0', '150']
            })}
            fill="url(#barGradient)"
          />
        </Svg>
      </View>
      <Text style={styles.loudnessValue}>{`${loudness} dB`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  barContainer: {
    width: 40, 
    height: 140, 
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  loudnessLabel: {
    fontWeight: 'medium',
    fontSize: 20,
    marginRight: 20,
  },
  loudnessValue: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default LoudnessBar;
