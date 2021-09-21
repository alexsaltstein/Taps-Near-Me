import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Logo from '../widgets/Logo';
import filter from '../../../assets/navigation/adjust-alt.png';
import settings from '../../../assets/navigation/settings.png';

const NavIcons = ({ source, to, navigation }) => {
  return (
    <TouchableOpacity
      onPress = {()=>navigation.navigate(to)}
      style={styles.navButton}>
      <Image
        source={source}
        style={styles.navIcon} />
    </TouchableOpacity>
  )
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <View style={styles.buttonsContainer}>
          {
            [{ icon: filter, to: 'Filter' },
            { icon: settings, to: 'Settings' }].map(i => (
              <NavIcons 
              source={i.icon} 
              to={i.to} 
              navigation={navigation}/>
            ))
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    paddingHorizontal: 15,
  },
  navIcon: {
    width: 40,
    height: 40,
  }
})
export default HomeScreen;