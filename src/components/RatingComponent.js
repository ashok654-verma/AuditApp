import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RatingComponent({ value, onChange, max = 5 }) {
    return (
        <View style={styles.container}>
            {Array.from({ length: max }, (_, i) => {
                const rating = (i + 1).toString();
                const selected = value === rating;

                return (
                    <TouchableOpacity
                        key={rating}
                        style={[styles.circle, selected && styles.selected]}
                        onPress={() => onChange(rating)}
                    >
                        <Text style={selected ? styles.selectedText : styles.text}>{rating}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16
    },
    circle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#0066cc',
        borderColor: '#0066cc',
    },
    text: { fontSize: 16, color: '#333' },
    selectedText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
