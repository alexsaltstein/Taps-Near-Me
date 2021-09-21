import React from 'react';
import {Text, TextInput} from 'react-native';
import NavigationDecider from './src/components/NavigationDecider';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { OpenSans_400Regular, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import AppLoading from 'expo-app-loading';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function App() {
  let [fontsLoaded] = useFonts({
    'poppins': Poppins_400Regular,
    'poppins-bold': Poppins_700Bold,
    'open-sans': OpenSans_400Regular,
    'open-sans-semi': OpenSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationDecider />
    );
  }
}
