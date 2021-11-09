import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, ScrollView } from 'react-native';
import Logo from '../widgets/Logo';
import filters from '../../../assets/navigation/adjust-alt.png';
import settings from '../../../assets/navigation/settings.png';
import map from '../../../assets/navigation/map.png'
import NavIcons from '../widgets/NavIcons';
import setStatusBarColor from '../utils/StatusBarColorFunctions';
import useUserLocation from '../utils/useUserLocationFunctions'
import useFilter from '../utils/useFilterFunctions'
import { handleError } from '../utils/ErrorFunctions';
import ErrorToast from '../widgets/ErrorToast';
import { COLORS } from '../../styles/COLORS';
import { SHADOWS } from '../../styles/shadows';

const HomeScreen = ({ navigation }) => {
  const [setColor] = setStatusBarColor();
  const [error, setError] = React.useState(null);
  const [location, setLocation] = useUserLocation();
  const [filter, setFilter] = useFilter();

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        handleError('Permission to access location was denied', setError);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  React.useEffect(() => {
    navigation.addListener(
      'focus',
      () => {
        setColor(COLORS.white);
      },
    );
  }, [])

  return (
    <View style={styles.container}>
      <ErrorToast error={error} />
      <View style={styles.header}>
        <Logo />
        <View style={styles.buttonsContainer}>
          {
            [{ icon: filters, to: 'Filter' },
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
      <ScrollView>
        <Text style={styles.headlineText}>How to Use</Text>
        <View style={styles.filterContainer}>
          <View style={styles.imageTextContainer}>
          <Text style={styles.filterDescriptionText}>1. Tap on the Filter Icon</Text>
          <Image style={styles.filterIconDisplay} source={filter}/>
        </View>
          <Text style={styles.filterDescriptionText}>2. Select your desired search filter</Text>
          <View style={styles.filterOptionsDisplay}>
              <Text style={styles.filterDescriptionText}>{'\u2022'}  ABV Range</Text>
              <Text style={styles.filterDescriptionText}>{'\u2022'}  IBU Range</Text>
              <Text style={styles.filterDescriptionText}>{'\u2022'}  Style</Text>
              <Text style={styles.filterDescriptionText}>{'\u2022'}  Minimum Global Rating</Text>
              <Text style={styles.filterDescriptionText}>{'\u2022'}  Distance</Text>
          </View>
          <Text style={styles.filterDescriptionText}>3. Save your search filter by pressing "Save"</Text>
          <View style={styles.imageTextContainer}>
            <Text style={styles.filterDescriptionText}>4. Tap on the Map Icon</Text>
            <Image style={styles.filterIconDisplay} source={map}/>
          </View>
          <Text style={styles.filterDescriptionText}>5. Find where the taps are near you!</Text>
        </View>
        <Text style={styles.additionalText}>No taps found? No problem!</Text> 
        <Text style={styles.additionalText}>Just refine your search until taps are found.</Text>
        <Text style={styles.additionalText}>There are currently over 150 beers available!</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green,
    alignItems: 'center', 
    justifyContent: 'flex-start'
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
    paddingBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start', 
    color: COLORS.white
  },
  filterDescriptionText: {
    fontSize: 20,
    paddingVertical: 12, 
    paddingHorizontal: 12, 
  },
  filterIconDisplay: {
    width: 20,
    height: 20
  },
  filterOptionsDisplay: {
    paddingLeft: 22
  },
  additionalText: {
    fontSize: 20, 
    paddingHorizontal: 12, 
    paddingTop: 20,
    paddingBottom: 24,
    textAlign: 'left', 
    color: COLORS.white,
  }, 
  filterContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    ...SHADOWS.button
  }, 
  imageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
export default HomeScreen;