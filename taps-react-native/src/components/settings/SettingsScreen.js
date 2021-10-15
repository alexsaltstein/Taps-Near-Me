import React from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import BackButton from '../widgets/BackButton';
import backImage from '../../../assets/navigation/leftArrow.png';
import { SECTIONS } from './consts';
import setStatusBarColor from '../utils/StatusBarColorFunctions';

const SettingsSection = ({ title, subs }) => {
  return (
    <View style={styles.padding}>
      <Text style={styles.subsectionTitle}>{title}</Text>
      <View style={styles.subsectionContainer}>
        {subs.map((val, index) => (
          <View key={val + index}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => val.onPress()}
              style={styles.subsectionTouchable}>
              <View style={styles.row}>
                <Image source={val.icon} style={styles.subsectionImage} />
                <Text style={styles.subsectionText}>{val.label}</Text>
              </View>
              <Image source={backImage} style={styles.subsectionArrow} />
            </TouchableOpacity>
            {index != subs.length - 1 && <View style={styles.border} />}
          </View>
        ))}
      </View>
    </View>
  )
}

const SettingsScreen = ({ navigation }) => {
  const [setColor] = setStatusBarColor();

  React.useEffect(() => {
    navigation.addListener(
      'focus',
      () => {
        setColor(COLORS.red);
      },
    );
  },[])

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} color={COLORS.white} />
      <Text style={styles.title}>Settings</Text>
      <ScrollView style={styles.width}>
        {Object.keys(SECTIONS).map(i => (
          <SettingsSection
            key={i}
            title={i}
            subs={SECTIONS[i]}
          />
        ))}
      </ScrollView>
      <Text style={styles.versionText}>v{Constants.manifest.version}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.red
  },
  title: {
    fontSize: 30,
    fontFamily: 'open-sans-semi',
    color: COLORS.white,
  },
  width: {
    width: '95%'
  },
  padding: {
    padding: 10,
  },
  subsectionTitle: {
    fontSize: 15,
    color: COLORS.white,
    paddingLeft: 10,
    fontFamily: 'open-sans-semi'
  },
  subsectionContainer: {
    borderColor: COLORS.white,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    backgroundColor: COLORS.transWhite
  },
  subsectionTouchable: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  subsectionImage: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
    resizeMode: 'contain'
  },
  subsectionText: {
    color: COLORS.white,
    paddingLeft: 5,
    fontSize: 15,
    fontFamily: 'open-sans'
  },
  subsectionArrow: {
    transform: [{ rotate: '180deg' }],
    width: 20,
    height: 20,
  },
  border: {
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1
  },
  versionText: {
    position: 'absolute',
    bottom: 0,
    color: COLORS.white,
    fontFamily: 'open-sans-semi'
  }
})

export default SettingsScreen;