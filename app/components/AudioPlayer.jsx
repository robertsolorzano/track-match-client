import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

let currentSound = null;

const AudioPlayer = ({ previewUrl }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const iconColor = previewUrl ? "#000000" : "#A9A9A9";
    const shakeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        return () => {
            if (currentSound) {
                currentSound.unloadAsync();
                currentSound = null;
            }
        };
    }, [previewUrl]);

    const triggerShake = () => {
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 8, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -8, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 8, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true })
        ]).start();
    };


    const togglePlayback = async () => {
        if (!previewUrl) {
            triggerShake(); // Trigger shake animation
            return; // Early return if there's no preview URL
        }

        if (currentSound) {
            await currentSound.unloadAsync();
            currentSound = null;
            setIsPlaying(false);
        } else {
            const { sound } = await Audio.Sound.createAsync(
                { uri: previewUrl },
                { shouldPlay: true },
                updateStatus
            );
            currentSound = sound;
            setIsPlaying(true);

            sound.setOnPlaybackStatusUpdate(updateStatus);
        }
    };

    const updateStatus = (status) => {
        if (status.didJustFinish) {
            setIsPlaying(false);
            if (currentSound) {
                currentSound.unloadAsync();
                currentSound = null;
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={togglePlayback} style={styles.iconContainer}>
                <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                    <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={40} color={iconColor} />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', 
    },
    iconContainer: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    feedbackContainer: {
        position: 'absolute',
        top: -35,
        left: 0,
        right: 0, 
    },
    feedbackText: {
        color: 'red',
        fontSize: 10,
        textAlign: 'center',
    },
});

export default AudioPlayer;
