import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import tap from '../../../assets/general/tap.png';
import { COLORS } from '../../styles/COLORS';

const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <Image source={tap} style={styles.logo} />
        <Text style={styles.text}>Taps near me</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  border: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomColor: COLORS.black,
    borderBottomWidth: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'poppins-bold',
    fontSize: 20,
  }
});

export default Logo;