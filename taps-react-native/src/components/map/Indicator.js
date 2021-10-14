import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import { COLORS } from '../../styles/COLORS';

const Indicator = ({ width, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      activeOpacity={1}>
      <View style={{
        width: width,
        height: width,
        borderRadius: width / 2,
        backgroundColor: COLORS.white,
        margin: 5
      }}
      />
    </TouchableOpacity>
  )
}

export default Indicator;