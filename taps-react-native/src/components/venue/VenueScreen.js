import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackButton from '../widgets/BackButton';

const VenueScreen = ({navigation, route}) => {
  const {id} = route.params;
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation}/>
      <Text>Venue Screen</Text>
      <Text>id: {id}</Text>
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

export default VenueScreen;