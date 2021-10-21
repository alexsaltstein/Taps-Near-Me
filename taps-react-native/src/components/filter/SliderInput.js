import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { COLORS } from '../../styles/COLORS';


const SliderInput = ({ label, curr, setCurr }) => {
  const [thumbColor, setThumbColor] = React.useState(COLORS.white);
  const [display, setDisplay] = React.useState(curr);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{label}:</Text>
        <Text style={styles.title}>{parseInt(display)}{display === 100 && '+'} mi</Text>
      </View>
      <Slider
        style={styles.sliderContainer}
        minimumValue={1}
        step={1}
        maximumValue={100}
        minimumTrackTintColor={COLORS.white}
        maximumTrackTintColor={COLORS.transWhite}
        thumbTintColor={thumbColor}
        value={curr}
        onValueChange={(value) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setDisplay(value);
        }}
        onSlidingStart={() => setThumbColor(COLORS.lightpurple)}
        onSlidingComplete={(value) => { setCurr(value); setThumbColor(COLORS.white) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 20,
    color: COLORS.white,
  },
  sliderContainer: {
    width: '95%',
    height: 40,
    alignSelf: 'center'
  }
})

export default SliderInput;