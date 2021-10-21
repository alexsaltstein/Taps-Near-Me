import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import BackButton from '../widgets/BackButton';
import ImageInput from './ImageInput';
import NumberInput from './NumberInput';
import SliderInput from './SliderInput';
import setStatusBarColor from '../utils/StatusBarColorFunctions';
import TypeInput from './TypeInput';

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
  }, [])

  return (
    <View style={styles.container}>
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
    </View>
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
})

export default FilterScreen;