import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import BackButton from '../widgets/BackButton';

const MapScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation}/>
      <Text>Map Screen</Text>
      <TouchableOpacity onPress={()=>{navigation.navigate('Venue', {id: '1239401290'})}}>
        <Text>Venue</Text>
      </TouchableOpacity>
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

export default MapScreen;