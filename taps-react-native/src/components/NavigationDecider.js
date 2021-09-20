import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home/HomeScreen';
import ErrorPage from './widgets/ErrorPage';

const Stack = createNativeStackNavigator();

const NavigationDecider = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ErrorPage" component={ErrorPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationDecider;