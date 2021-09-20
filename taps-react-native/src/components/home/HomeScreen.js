import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate('ErrorPage')}>
        <Text>Errror</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;