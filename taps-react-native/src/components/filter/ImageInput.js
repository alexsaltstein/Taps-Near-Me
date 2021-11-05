import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import leftStar from '../../../assets/filter/left_star.png';
import rightStar from '../../../assets/filter/right_star.png';

import leftStarFilled from '../../../assets/filter/left_star_filled.png';
import rightStarFilled from '../../../assets/filter/right_star_filled.png';

const Section = ({ val, src, curr, setCurr }) => {
  return (
    <TouchableOpacity
      onPress={() => { setCurr(curr === val ? -1 : val) }}
    >
      <Image style={{ tintColor: COLORS.white, width: 20, height: 40, resizeMode: 'contain' }} source={src} />
    </TouchableOpacity>
  )
}

const ImageInput = ({ label, curr, setCurr }) => {
  const size = 5;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.subcontainer}>
        {
          new Array(size).fill(0).map((val, index) => (
            <View style={styles.touchableContainer}
              key={`star-${index}`}>
              <Section
                val={index}
                src={index <= curr ? leftStarFilled:leftStar}
                curr={curr}
                setCurr={setCurr} />
              <Section
                val={index + 0.5}
                src={index < curr ? rightStarFilled:rightStar}
                curr={curr}
                setCurr={setCurr} />
            </View>
          ))
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  subcontainer: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 20,
    color: COLORS.white,
  },
  touchableContainer: {
    flexDirection: 'row',
    padding: 2
  }
});

export default ImageInput;