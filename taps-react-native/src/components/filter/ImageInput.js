import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import leftStar from '../../../assets/filter/left_star.png';
import rightStar from '../../../assets/filter/right_star.png';

const Section = ({ val, src, curr, setCurr }) => {
  return (
    <TouchableOpacity
      onPress={() => { setCurr(curr===val ? -1:val) }}
    >
      <Image style={{ tintColor: val <= curr ? COLORS.red : COLORS.black, width: 20, height: 40, resizeMode: 'contain' }} source={src}/>
    </TouchableOpacity>
  )
}

const ImageInput = () => {
  const size = 5;
  const [curr, setCurr] = React.useState(-1);
  return (
    <View style={styles.container}>
      {
        new Array(size).fill(0).map((val, index) => (
          <View style={styles.touchableContainer}>
            <Section
              val={index}
              src={leftStar}
              curr={curr}
              setCurr={setCurr} />
            <Section
              val={index+0.5}
              src={rightStar}
              curr={curr}
              setCurr={setCurr} />
          </View>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchableContainer: {
    flexDirection: 'row',
    padding: 2
  }
});

export default ImageInput;