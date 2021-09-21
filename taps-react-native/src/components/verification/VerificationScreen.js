import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const VerificationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Verification Screen</Text>
      <TouchableOpacity
      onPress={()=>navigation.navigate('Home')}>
        <Text>Enter</Text>
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

export default VerificationScreen;