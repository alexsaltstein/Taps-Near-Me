import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Logo from '../widgets/Logo';
import filter from '../../../assets/navigation/adjust-alt.png';
import settings from '../../../assets/navigation/settings.png';
import map from '../../../assets/navigation/map.png'
import NavIcons from '../widgets/NavIcons';
import setStatusBarColor from '../utils/StatusBarColorFunctions';
import { COLORS } from '../../styles/COLORS';

const HomeScreen = ({ navigation }) => {
  const [setColor] = setStatusBarColor();

  React.useEffect(() => {
    navigation.addListener(
      'focus',
      () => {
        setColor(COLORS.white);
      },
    );
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <View style={styles.buttonsContainer}>
          {
            [{ icon: filter, to: 'Filter' },
            { icon: settings, to: 'Settings' }, 
            { icon: map, to: 'Map'}].map(i => (
              <NavIcons
                key={i.to}
                source={i.icon}
                to={i.to}
                navigation={navigation} />
            ))
          }
        </View>
      </View>
      <Text style={styles.headlineText}>How to Use</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterDescriptionText}>1. Click on the Filter Icon <Image style={styles.filterIconDisplay} source={filter}/></Text>
        <Text style={styles.filterDescriptionText}>2. Select your desired search filter</Text>
        <View style={styles.filterOptionsDisplay}>
          <ul>
            <Text>ABV Range</Text>
            <Text>IBU Range</Text>
            <Text>Style</Text>
            <Text>Minimum Global Rating</Text>
            <Text>Distance</Text>
          </ul>
        </View>
        <Text style={styles.filterDescriptionText}>3. Save your search filter by pressing "Save"</Text>
        <Text style={styles.filterDescriptionText}>4. Click on the Map Icon <Image style={styles.filterIconDisplay} source={map}/></Text>
        <Text style={styles.filterDescriptionText}>5. Find where the taps are near you!</Text>
        <Text style={styles.additionalText}>No taps found? No problem! Just refine your search until taps are found.</Text>
        <Text style={styles.additionalText}>There are currently over 150 beers available!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'flex-start'
  }, 
  headlineText: {
    fontSize: 32, 
    padding: 8
  },
  filterDescriptionText: {
    fontSize: 20,
    paddingBottom: 8,
  },
  filterIconDisplay: {
    width: 20,
    height: 20
  },
  filterOptionsDisplay: {
    paddingHorizontal: 22
  },
  additionalText: {
    fontSize: 24
  }
})
export default HomeScreen;