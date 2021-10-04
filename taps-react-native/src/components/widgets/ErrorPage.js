import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import dancingBottles from '../../../assets/error/dancingBottles.gif';
import { COLORS } from '../../styles/COLORS';
import BackButton from './BackButton';

const ErrorPage = ({
  title = 'Sorry, no results found',
  message = 'Looks like our servers went to the bar!',
  navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <BackButton navigation={navigation} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Image source={dancingBottles} style={styles.gif} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontFamily: 'open-sans-semi'
  },
  message: {
    fontFamily: 'open-sans'
  },
  gif: {
    width: 200,
    height: 200,
    resizeMode: 'center',
  }
});

export default ErrorPage;