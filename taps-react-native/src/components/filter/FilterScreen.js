import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import BackButton from '../widgets/BackButton';
import ImageInput from './ImageInput';
import NumberInput from './NumberInput';
import SliderInput from './SliderInput';
import setStatusBarColor from '../utils/StatusBarColorFunctions';
import useFilter from '../utils/useFilterFunctions';
import TypeInput from './TypeInput';
import { SHADOWS } from '../../styles/shadows';
import { ABVS, IBUS } from './consts';
import { handleError } from '../utils/ErrorFunctions';
import ErrorToast from '../widgets/ErrorToast';

const FilterScreen = ({ navigation }) => {
  const [setColor] = setStatusBarColor();
  const [filter, setFilter] = useFilter();
  const [error, setError] = React.useState(null);

  const [type, setType] = React.useState(filter.type || '');
  const [radius, setRadius] = React.useState(filter.radius || 0);
  const [rating, setRating] = React.useState(filter.rating || -1);
  const [minABVIndex, setMinABVIndex] = React.useState(filter.minABV ? ABVS.indexOf(filter.minABV) : -1);
  const [maxABVIndex, setMaxABVIndex] = React.useState(filter.maxABV ? ABVS.indexOf(filter.maxABV) : -1);
  const [minIBUIndex, setMinIBUIndex] = React.useState(filter.minIBU ? IBUS.indexOf(filter.minIBU) : -1);
  const [maxIBUIndex, setMaxIBUIndex] = React.useState(filter.maxIBU ? IBUS.indexOf(filter.maxIBU) : -1);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      setColor(COLORS.purple);
    })
  }, []);

  const doReset = () => {
    setFilter({});
    setType('');
    setRadius(0);
    setRating(-1);
    setMinABVIndex(-1);
    setMaxABVIndex(-1);
    setMinIBUIndex(-1);
    setMaxIBUIndex(-1);
  }

  const doSubmit = () => {
    // when filtering need to remove the < and > before sending
    if (minABVIndex !== -1 && maxABVIndex !== -1 && minABVIndex > maxABVIndex) {
      handleError('Error: min ABV must be less than max ABV', setError)
    } else if (minIBUIndex !== -1 && maxIBUIndex !== -1 && minIBUIndex > maxIBUIndex) {
      handleError('Error: min IBU must be less than max IBU', setError)
    } else {
      setFilter({
        ...(type !== '' && { type }),
        ...(radius !== 0 && { radius }),
        ...(rating !== -1 && { rating }),
        ...(minABVIndex !== -1 && { minABV: ABVS[minABVIndex] }),
        ...(maxABVIndex !== -1 && { maxABV: ABVS[maxABVIndex] }),
        ...(minIBUIndex !== -1 && { minIBU: IBUS[minIBUIndex] }),
        ...(maxIBUIndex !== -1 && { maxIBU: IBUS[maxIBUIndex] }),
      })
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.center}>
        <ErrorToast error={error} />
      </View>
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
          vals={ABVS}
          label="abv" />
        <NumberInput
          minIndex={minIBUIndex}
          setMinIndex={setMinIBUIndex}
          maxIndex={maxIBUIndex}
          setMaxIndex={setMaxIBUIndex}
          vals={IBUS}
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
  center: {
    width: '100%',
    alignItems: 'center',
    zIndex: 100
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