import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const NavIcons = ({ source, to, navigation }) => {
  return (
    <TouchableOpacity
      testID = {'NavIcons.Button'}
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