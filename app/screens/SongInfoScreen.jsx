import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity, Easing } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import DropdownMenu from '../components/DropdownMenu';
import AudioPlayer from '../components/AudioPlayer';
import CustomCircle from '../components/CustomCircle';
import { keyNumberToLetter, modeNumberToMusicalKey, timeNumberToFraction, msToTime } from '../utils/musicUtils';
import{ db } from '../../firebaseConfig';
import { ref, push, query, orderByChild, equalTo, get } from 'firebase/database';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const SongInfoScreen = ({ route }) => {
    const { track, audioFeatures } = route.params;
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const key = `${keyNumberToLetter(audioFeatures.key)} ${modeNumberToMusicalKey(audioFeatures.mode)}`;
    const timeSignature = timeNumberToFraction(audioFeatures.time_signature);
    const tempo = audioFeatures.tempo.toFixed(2);
    const duration = msToTime(audioFeatures.duration_ms);
    const previewUrl = track.preview_url;


    const handleOptionsPress = () => {
        setDropdownVisible(true);
    };

    const handleSaveSong = async () => {
        try {
            // Reference to the 'savedSongs' collection
            const savedSongsRef = ref(db, 'savedSongs');

            // Query the database for a song with the same track ID
            const queryRef = query(savedSongsRef, orderByChild('track/id'), equalTo(track.id));
            const snapshot = await get(queryRef);

            if (!snapshot.exists()) {
                // If the song doesn't exist, save it to Firebase
                await push(savedSongsRef, {
                    track,
                    audioFeatures
                });
                console.log('Song saved to Firebase:', track.name);
            } else {
                console.log('Song already exists, not saving duplicate.');
            }
        } catch (error) {
            console.error('Error saving song: ', error);
        }
        setDropdownVisible(false);
    };


    // Initialize an Animated.Value for scroll position and rotation
    const scrollY = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const [isFlipped, setIsFlipped] = useState(false);

    const handlePress = () => {
        const toValue = isFlipped ? 0 : 1;
        setIsFlipped(!isFlipped);

        Animated.timing(rotateAnim, {
            toValue,
            duration: 800,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
        }).start();
    };

    const frontRotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const backRotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '0deg'],
    });

    const frontOpacity = rotateAnim.interpolate({
        inputRange: [0, 0.45, 0.55, 1],
        outputRange: [1, 1, 0, 0],
    });

    const backOpacity = rotateAnim.interpolate({
        inputRange: [0, 0.6, 0.7, 1],
        outputRange: [0, 0, 1, 1],
    });

    const iconMap = {
        Energy: 'flash',
        Danceability: 'dance-ballroom',
        Instrumentalness: 'saxophone',
        Liveness: 'pulse',
        Acousticness: 'guitar-acoustic',
        Speechiness: 'microphone',
    };


    return (
        <View style={{ flex: 1 }}>
            <Animated.View style={[{ zIndex: 1, width: '100%', position: 'absolute', top: 0 }, { backgroundColor: 'transparent' }]}>
                <BlurView
                    intensity={100}
                    style={{ position: 'absolute', width: '100%', height: '100%' }}
                />
                <CustomHeader onOptionsPress={handleOptionsPress} />
            </Animated.View>
            <Animated.ScrollView
                style={{ flex: 1, marginTop: 0 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >

                <View style={styles.container}>
                    <TouchableOpacity onPress={handlePress} activeOpacity={1}>
                        <View>
                            <Animated.View style={[styles.albumArt, { transform: [{ perspective: 1000 }, { rotateY: frontRotate }] }, { opacity: frontOpacity }]}>
                                <Image source={{ uri: track.album.images[0].url }} style={StyleSheet.absoluteFill} />
                            </Animated.View>
                            <Animated.View style={[styles.albumArt, styles.backSide, { transform: [{ perspective: 1000 }, { rotateY: backRotate }] }, { opacity: backOpacity }]}>
                                <View>
                                    <Text style={styles.descriptionText}>
                                        <Text style={styles.boldValue}>{`${track.name}`}</Text>
                                        <Text> by </Text>
                                        <Text style={styles.boldValue}>{`${track.artists.map(artist => artist.name).join(", ")}`}</Text>
                                        <Text> is a </Text>
                                        <Text style={styles.boldValue}>{`${modeNumberToMusicalKey(audioFeatures.mode)}`}</Text>
                                        <Text> track</Text>
                                        {` in the `}
                                        <Text>{`key of `}</Text>
                                        <Text style={styles.boldValue}>{`${keyNumberToLetter(audioFeatures.key)}`}</Text>
                                        {`. With a `}
                                        <Text>{`tempo of `}</Text>
                                        <Text style={styles.boldValue}>{`${tempo} BPM`}</Text>
                                        {` and a `}
                                        <Text>{`time signature of `}</Text>
                                        <Text style={styles.boldValue}>{`${timeSignature}`}</Text>
                                        {`, it spans `}
                                        <Text style={styles.boldValue}>{`${duration}`}</Text>
                                        {`.`}
                                    </Text>
                                    <View style={styles.additionalInfoContainer}>
                                        {audioFeatures.energy > 0.6 && (
                                            <Text style={styles.additionalInfoText}>
                                                <MaterialCommunityIcons name={iconMap['Energy']} size={16} color="black" /> This track exudes lively energy, making it ideal for active pursuits.
                                            </Text>
                                        )}
                                        {audioFeatures.danceability > 0.8 && (
                                            <Text style={styles.additionalInfoText}>
                                                <MaterialCommunityIcons name={iconMap['Danceability']} size={16} color="black" /> Its rhythmic arrangement and infectious melody make it easy to tap and groove along.
                                            </Text>
                                        )}
                                        {audioFeatures.instrumentalness > 0.6 && (
                                            <Text style={styles.additionalInfoText}>
                                                <MaterialCommunityIcons name={iconMap['Instrumentalness']} size={16} color="black" /> This track is predominantly instrumental, providing a soothing ambiance.
                                            </Text>
                                        )}
                                        {audioFeatures.liveness > 0.6 && (
                                            <Text style={styles.additionalInfoText}>
                                                <MaterialCommunityIcons name={iconMap['Liveness']} size={16} color="black" /> It exhibits high liveness, giving you the feeling of being at a live concert.
                                            </Text>
                                        )}
                                        {audioFeatures.acousticness > 0.6 && (
                                            <Text style={styles.additionalInfoText}>
                                                <MaterialCommunityIcons name={iconMap['Acousticness']} size={16} color="black" /> With significant acoustic elements, this track offers a warm and natural sound.
                                            </Text>
                                        )}
                                        {audioFeatures.speechiness > 0.6 && (
                                            <Text style={styles.additionalInfoText}>
                                                <MaterialCommunityIcons name={iconMap['Speechiness']} size={16} color="black" /> It has a considerable amount of speechiness, featuring spoken words or vocals.
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            </Animated.View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.trackInfoContainer}>
                        <View style={styles.trackDetails}>
                            <Text style={styles.trackTitle}>{track.name}</Text>
                            <Text style={styles.artistName}>{track.artists.map((artist) => artist.name).join(', ')}</Text>
                        </View>

                        <AudioPlayer previewUrl={previewUrl} />
                    </View>

                    <View style={styles.audioFeaturesGrid}>
                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>Key</Text>
                            <Text style={styles.featureValue}>{key}</Text>
                        </View>

                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>Time Signature</Text>
                            <Text style={styles.featureValue}>{timeSignature}</Text>
                        </View>

                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>Tempo</Text>
                            <Text style={styles.featureValue}>{tempo} BPM</Text>
                        </View>

                        <View style={styles.featureContainer}>
                            <Text style={styles.featureTitle}>Duration</Text>
                            <Text style={styles.featureValue}>{duration}</Text>
                        </View>
                    </View>

                    <View style={styles.audioFeaturesCircle}>
                        <CustomCircle title="Energy" value={audioFeatures.energy} />
                        <CustomCircle title="Danceability" value={audioFeatures.danceability} />
                        <CustomCircle title="Instrumentalness" value={audioFeatures.instrumentalness} />
                        <CustomCircle title="Liveness" value={audioFeatures.liveness} />
                        <CustomCircle title="Acousticness" value={audioFeatures.acousticness} />
                        <CustomCircle title="Speechiness" value={audioFeatures.speechiness} />
                    </View>
                </View>
            </Animated.ScrollView>
            <DropdownMenu
                isVisible={isDropdownVisible}
                onClose={() => setDropdownVisible(false)}
                onSave={handleSaveSong}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    fixedHeader: {
        zIndex: 1,
        width: '100%',
        backgroundColor: '#F1F0F0',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#ffffff',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 10,
    },
    albumArt: {
        width: 280,
        height: 280,
        borderRadius: 4,
        resizeMode: 'contain',
        marginTop: 50,
    },
    backSide: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#e6e6e6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionContainer: {
        bottom: 40,
    },
    descriptionText: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    boldValue: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    additionalInfoContainer: {
        marginTop: 10,
        paddingHorizontal: 40,
    },
    additionalInfoText: {
        textAlign: 'center',
    },
    trackInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    trackDetails: {
        marginRight: 40,
    },
    trackTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: 200,
    },
    artistName: {
        fontSize: 18,
        color: '#313131',
        marginTop: 5,
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: 200,
    },
    audioFeaturesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '90%',
    },
    audioFeaturesCircle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        marginTop: 8,
    },
    featureContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        margin: 5,
        width: '40%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    featureTitle: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
        textAlign: 'center',
    },
    featureValue: {
        fontSize: 14,
        color: '#FF4801',
        textAlign: 'center',
    },
});

export default SongInfoScreen;
