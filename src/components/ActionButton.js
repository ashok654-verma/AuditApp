import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function ActionButton({
  title,
  onPress,
  backgroundColor = colors.red,
  style = {},
  textStyle = {},
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.button,
        { backgroundColor },
        style, 
      ]}
    >
      <Text style={[styles.label, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginBottom: 40,
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    width: '90%',
  },
  label: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
