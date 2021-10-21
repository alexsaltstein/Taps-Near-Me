import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import { SHADOWS } from '../../styles/shadows';

const NumberInput = ({ minIndex, maxIndex, setMinIndex, setMaxIndex, vals, label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Min {label}:</Text>
      <View style={styles.subcontainer}>
        {
          vals.map((val, index) => (
            <TouchableOpacity
              key={`min-${label}-${index}`}
              onPress={() => setMinIndex(minIndex === index ? -1 : index)}
              style={{ padding: 5 }}>
              <View style={{
                backgroundColor: (minIndex !== -1 && maxIndex !== -1) ?
                  (minIndex > maxIndex ? COLORS.gray :
                    (index < maxIndex && index >= minIndex) || (minIndex <= maxIndex && index === minIndex) ? COLORS.lightpurple : COLORS.white) :
                  minIndex !== -1 && index >= minIndex ? COLORS.lightpurple : COLORS.white,
                ...SHADOWS.button,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}>
                <Text style={{
                  color: index === minIndex ? (minIndex !== -1 && maxIndex !== -1 && minIndex > maxIndex) ? COLORS.red : COLORS.white : COLORS.black,
                  fontFamily: index === minIndex ? 'open-sans-semi' : 'open-sans',
                  fontSize: 15
                }}>{val}</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
      <Text style={styles.subtitle}>Max {label}:</Text>
      <View style={styles.subcontainer}>
        {
          vals.map((val, index) => (
            <TouchableOpacity
              key={`max-${label}-${index}`}
              onPress={() => setMaxIndex(maxIndex === index ? -1 : index)}
              style={{ padding: 5 }}>
              <View style={{
                backgroundColor: (minIndex !== -1 && maxIndex !== -1) ?
                  (minIndex > maxIndex ? COLORS.gray :
                    (index > minIndex && index <= maxIndex) || (minIndex <= maxIndex && index === maxIndex) ? COLORS.lightpurple : COLORS.white) :
                  maxIndex !== -1 && index <= maxIndex ? COLORS.lightpurple : COLORS.white,
                ...SHADOWS.button,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}>
                <Text style={{
                  color: index === maxIndex ? (minIndex !== -1 && maxIndex !== -1 && minIndex > maxIndex) ? COLORS.red : COLORS.white : COLORS.black,
                  fontFamily: index === maxIndex ? 'open-sans-semi' : 'open-sans',
                  fontSize: 15
                }}>{val}</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  subtitle: {
    fontFamily: 'open-sans',
    fontSize: 20,
    color: COLORS.white,
  },
  subcontainer: {
    flexDirection: 'row',
  },

});

export default NumberInput;