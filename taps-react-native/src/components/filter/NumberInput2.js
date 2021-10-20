import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import { SHADOWS } from '../../styles/shadows';

const NumberInput2 = ({ minIndex, maxIndex, setMinIndex, setMaxIndex, vals, isMax }) => {
  return (
    <View>
      <Text>Min abv:</Text>
      <View style={styles.container}>
        {
          vals.map((val, index) => (
            <TouchableOpacity
              onPress={() => setMinIndex(minIndex === index ? -1 : index)}
              style={{ padding: 5 }}>
              <View style={{
                backgroundColor: (minIndex !== -1 && maxIndex !== -1) ?
                  (minIndex > maxIndex ? COLORS.gray :
                    (index < maxIndex && index >= minIndex) || (minIndex <= maxIndex && index === minIndex) ? COLORS.red : COLORS.white) :
                  minIndex !== -1 && index >= minIndex ? COLORS.red : COLORS.white,
                ...SHADOWS.button,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}>
                <Text style={{
                  color: index === minIndex ? (minIndex !== -1 && maxIndex !== -1 && minIndex > maxIndex) ? COLORS.red: COLORS.white : COLORS.black,
                  fontFamily: index === minIndex ? 'open-sans-semi' : 'open-sans',
                  fontSize: 20
                }}>{val}</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
      <Text>Max abv:</Text>
      <View style={styles.container}>
        {
          vals.map((val, index) => (
            <TouchableOpacity
              onPress={() => setMaxIndex(maxIndex === index ? -1 : index)}
              style={{ padding: 5 }}>
              <View style={{
                backgroundColor: (minIndex !== -1 && maxIndex !== -1) ?
                (minIndex > maxIndex ? COLORS.gray :
                  (index > minIndex && index <= maxIndex) || (minIndex <= maxIndex && index === maxIndex) ? COLORS.red : COLORS.white) :
                  maxIndex !== -1 && index <= maxIndex ? COLORS.red : COLORS.white,
                ...SHADOWS.button,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}>
                <Text style={{
                  color: index === maxIndex ? (minIndex !== -1 && maxIndex !== -1 && minIndex > maxIndex) ? COLORS.red: COLORS.white : COLORS.black,
                  fontFamily: index === maxIndex ? 'open-sans-semi' : 'open-sans',
                  fontSize: 20
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
    flexDirection: 'row',
  },

});

export default NumberInput2;