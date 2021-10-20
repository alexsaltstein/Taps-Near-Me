import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const ErrorToast = ({ error }) => {
  return (
    <View style={styles.errorContainer}>
      {error &&
        <Text style={styles.errorText}>{error}</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    position: 'absolute',
    top: 10,
    zIndex: 100
  },
  errorText: {
    fontFamily: 'open-sans',
    fontSize: 13,
    backgroundColor: COLORS.red,
    color: COLORS.white,
    paddingHorizontal: 10,
    borderRadius: 5,
    overflow: 'hidden',
  }
});

export default ErrorToast;