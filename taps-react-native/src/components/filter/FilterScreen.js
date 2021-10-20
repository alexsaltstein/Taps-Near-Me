import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../widgets/BackButton';
import ImageInput from './ImageInput';
import NumberInput2 from './NumberInput2';

const FilterScreen = ({ navigation }) => {

  const [maxABVIndex, setMaxABVIndex] = React.useState(-1);
  const [minABVIndex, setMinABVIndex] = React.useState(-1);

  const [maxIndex, setMaxIndex] = React.useState(-1);
  const [minIndex, setMinIndex] = React.useState(-1);



  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Text>Filter Screen</Text>
      <Text>Rating:</Text>
      <ImageInput />
      {/* need to change to be an inclusive range rather than exclusive
        for example if individual min and max then the rang displays correct however if its both 
        min must be less than max and highlight the values between min and max. 
       */}
      <NumberInput2
        minIndex={minABVIndex}
        setMinIndex={setMinABVIndex}
        maxIndex={maxABVIndex}
        setMaxIndex={setMaxABVIndex}
        vals={['<4', '5', '6', '7', '8>']} />

      <NumberInput2
        minIndex={minIndex}
        setMinIndex={setMinIndex}
        maxIndex={maxIndex}
        setMaxIndex={setMaxIndex}
        vals={['<20', '30', '40', '50', '60>']} />

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