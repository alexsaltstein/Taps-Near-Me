import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import BackButton from '../widgets/BackButton';
import ImageInput from './ImageInput';
import NumberInput2 from './NumberInput2';

const FilterScreen = ({ navigation }) => {

  const [type, setType] = React.useState('');

  const [radius, setRadius] = React.useState(-1);

  const [rating, setRating] = React.useState(-1);

  const [maxABVIndex, setMaxABVIndex] = React.useState(-1);
  const [minABVIndex, setMinABVIndex] = React.useState(-1);

  const [maxIndex, setMaxIndex] = React.useState(-1);
  const [minIndex, setMinIndex] = React.useState(-1);



  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Text>Filter Screen</Text>
      <Text>Type (in form "style - substyle"):</Text>
      <TextInput
        style={{ width: 200, height: 30, borderWidth: 1, borderColor: COLORS.black }}
        value={type}
        onChangeText={(val) => setType(val)} />
      <Text>Radius:</Text>
      <Text>Minimum Rating:</Text>
      <ImageInput />
      <NumberInput2
        minIndex={minABVIndex}
        setMinIndex={setMinABVIndex}
        maxIndex={maxABVIndex}
        setMaxIndex={setMaxABVIndex}
        vals={['<4', '5', '6', '7', '8>']}
        label="abv" />
      <NumberInput2
        minIndex={minIndex}
        setMinIndex={setMinIndex}
        maxIndex={maxIndex}
        setMaxIndex={setMaxIndex}
        vals={['<20', '30', '40', '50', '60>']}
        label="ibu" />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default FilterScreen;