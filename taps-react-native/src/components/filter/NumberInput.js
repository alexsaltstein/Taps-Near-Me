import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import { SHADOWS } from '../../styles/shadows';

const NumberInput = ({ vals, isMax }) => {
  const [curr, setCurr] = React.useState(-1);


  return (
    <View style={styles.container}>
      {
        vals.map((val, index) => (
          <TouchableOpacity
            onPress={() => setCurr(curr === index ? -1 : index)}
            style={{ padding: 5 }}>
            <View style={{
              backgroundColor: isMax ?
                index <= curr ? COLORS.red : COLORS.white :
                curr !== -1 && index >= curr ? COLORS.red : COLORS.white,
              ...SHADOWS.button,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}>
              <Text style={{
                color: index === curr ? COLORS.white : COLORS.black,
                fontFamily: index === curr ? 'open-sans-semi' : 'open-sans',
                fontSize: 20
              }}>{val}</Text>
            </View>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

});

export default NumberInput;