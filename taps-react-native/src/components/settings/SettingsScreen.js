import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackButton from '../widgets/BackButton';

const SettingsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation}/>
      <Text>Settings Screen</Text>
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

export default SettingsScreen;