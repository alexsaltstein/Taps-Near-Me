import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home/HomeScreen';
import ErrorPage from './widgets/ErrorPage';
import FilterScreen from './filter/FilterScreen';
import SettingsScreen from './settings/SettingsScreen';
import VerificationScreen from './verification/VerificationScreen';

const Stack = createNativeStackNavigator();

const NavigationDecider = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationDecider;