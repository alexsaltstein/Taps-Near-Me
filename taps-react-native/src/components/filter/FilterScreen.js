import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackButton from '../widgets/BackButton';
  

const FilterScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation}/>
      <Text>Filter Screen</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default FilterScreen;