import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../styles/COLORS';

const NavIcons = ({ source, to, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(to)}
      style={styles.navButton}>
      <Image
        source={source}
        style={styles.navIcon} />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  navButton: {
    paddingHorizontal: 8,
  },
  navIcon: {
    width: 40,
    height: 40,
  }
});

export default NavIcons;