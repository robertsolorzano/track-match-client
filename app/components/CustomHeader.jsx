import React from 'react';
import {TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ onOptionsPress, opacity }) => {
    const navigation = useNavigation();
    const headerStyle = [
        styles.headerContainer,
        { opacity: opacity || 1 } 
    ];

    return (
        <Animated.View style={headerStyle}>
            {/* Custom Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color="#FF4801" />
            </TouchableOpacity>

            {/* Options Button */}
            <TouchableOpacity style={styles.details} onPress={onOptionsPress}>
                <Ionicons name="ellipsis-horizontal" size={22} color="#FF4801" />
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 60,
    },
    details: {
        marginRight: 14,
    }
});

export default CustomHeader;
