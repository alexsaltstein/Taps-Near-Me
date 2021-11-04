import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import BackButton from '../widgets/BackButton';
import ImageInput from './ImageInput';
import NumberInput from './NumberInput';
import SliderInput from './SliderInput';
import setStatusBarColor from '../utils/StatusBarColorFunctions';
import TypeInput from './TypeInput';
import { SHADOWS } from '../../styles/shadows';

const FilterScreen = ({ navigation }) => {
  const [setColor] = setStatusBarColor();

  const [type, setType] = React.useState('');

  const [radius, setRadius] = React.useState(0);

  const [rating, setRating] = React.useState(-1);

  const [maxABVIndex, setMaxABVIndex] = React.useState(-1);
  const [minABVIndex, setMinABVIndex] = React.useState(-1);

  const [maxIndex, setMaxIndex] = React.useState(-1);
  const [minIndex, setMinIndex] = React.useState(-1);


  React.useEffect(() => {
    navigation.addListener('focus', () => {
      setColor(COLORS.purple);
    })
  }, []);

  const doReset = () => {
    alert('reset');
  }

  const doSubmit = () => {
    alert('submit');
  }

  return (
    <ScrollView style={styles.container}>
      <BackButton navigation={navigation} color={COLORS.white} />
      <Text style={styles.title}>Map Filter</Text>
      <View style={styles.formContainer}>
        <TypeInput
          label="Type:"
          curr={type}
          setCurr={setType} />
        <SliderInput
          label="Radius"
          curr={radius}
          setCurr={setRadius} />
        <ImageInput
          label="Minimum Rating:"
          curr={rating}
          setCurr={setRating} />
        <NumberInput
          minIndex={minABVIndex}
          setMinIndex={setMinABVIndex}
          maxIndex={maxABVIndex}
          setMaxIndex={setMaxABVIndex}
          vals={['<4', '5', '6', '7', '8>']}
          label="abv" />
        <NumberInput
          minIndex={minIndex}
          setMinIndex={setMinIndex}
          maxIndex={maxIndex}
          setMaxIndex={setMaxIndex}
          vals={['<20', '30', '40', '50', '60>']}
          label="ibu" />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => doReset()}
          style={[styles.button, { backgroundColor: COLORS.red }]}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => doSubmit()}
          style={[styles.button, { backgroundColor: COLORS.green }]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.purple,
  },
  title: {
    fontFamily: 'open-sans-semi',
    color: COLORS.white,
    fontSize: 30,
    alignSelf: 'center'
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    ...SHADOWS.button
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: 'open-sans-semi'
  }
})

export default FilterScreen;