import React from 'react';
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const ScrollPages = ({ title, distance = '0.7mi', navigation }) => {
  return (
    <View style={styles.scrollPage}>
      <TouchableOpacity style={styles.beerResultContainer}
        onPress={() => navigation.navigate('Venue', { id: '1231245' })}
        activeOpacity={1}>
        <Text style={styles.beerResultCarrot}>⟩</Text>
        <Text style={styles.beerResultTitle}>{title}</Text>
        <Text>{distance}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollPage: {
    width: Dimensions.get('window').width,
    alignItems: 'center'
  },
  beerResultContainer: {
    backgroundColor: COLORS.white,
    width: '75%',
    borderRadius: 20,
    padding: 10
  },
  beerResultCarrot: {
    color: COLORS.lightgray,
    alignSelf: 'center',
    fontSize: 20,
    marginTop: -10,
    transform: [{ rotate: '-90deg' }]
  },
  beerResultTitle: {
    fontSize: 25,
    fontFamily: 'open-sans-semi'
  },
});

export default ScrollPages;