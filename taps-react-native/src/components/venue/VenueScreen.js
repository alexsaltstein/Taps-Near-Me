import axios from 'axios';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Linking, Platform } from 'react-native';
import ClickableText from '../widgets/ClickableText';
import { SERVER_URL } from '../../../config';
import { COLORS } from '../../styles/COLORS';
import BackButton from '../widgets/BackButton';
import ErrorPage from '../widgets/ErrorPage';
import Loading from '../widgets/Loading';
import targetIcon from '../../../assets/venue/target.png';
import { SHADOWS } from '../../styles/shadows';
import BeerDisplay from './BeerDisplay';
import Spacing from '../widgets/Spacing';
import setStatusBarColor from '../utils/StatusBarColorFunctions';

const VenueScreen = ({ navigation, route }) => {
  const { id } = route.params;

  const [setColor] = setStatusBarColor();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [venue, setVenue] = React.useState(null);

  const getData = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/venues/beers/${id}`);
      setVenue(res.data.venue);
    } catch {
      setError(true);
    }
  }

  const getWebiste = (name) => {
    return `https://untappd.com/search?q=${encodeURIComponent(name)}&type=venues&sort=`;
  }

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await getData();
      setLoading(false);
    })()

    navigation.addListener(
      'focus',
      () => {
        setColor(COLORS.white, COLORS.purple);
      },
    );
  }, []);

  return (
    <View style={styles.flex1}>
      { loading ?
        <Loading navigation={navigation} /> :
        <View style={styles.flex1}>
          {
            error ?
              <ErrorPage navigation={navigation} />
              :
              <ScrollView style={styles.flex1}>
                <View style={styles.container}>
                  <BackButton navigation={navigation} />
                  <Text style={styles.title}>{venue.name}</Text>
                  <ClickableText style={styles.title} text="Search for Venue on Untappd" url={getWebiste(venue.name)} />
                  <Spacing vertical={5} />
                  <View style={styles.header}>
                    <Text style={styles.locationText}>
                      Located in:
                    {'\n'}
                      {venue.city}, {venue.state}
                    </Text>
                    <TouchableOpacity
                      style={styles.directionsButton}
                      onPress={() => {
                        if (Platform.OS === 'ios') Linking.openURL(`http://maps.apple.com/maps?q=${venue.coordinates[1]},${venue.coordinates[0]}`);
                        else Linking.openURL(`http://maps.google.com/maps?q=${venue.coordinates[1]},${venue.coordinates[0]}`);
                      }}
                    >
                      <Image source={targetIcon} style={styles.directionsImage} />
                      <Text style={styles.directionsText}>Get Directions</Text>
                    </TouchableOpacity>
                  </View>
                  <Spacing vertical={20} />
                  <BeerDisplay
                    beersAvailable={venue.beersAvailable} />
                </View>
              </ScrollView>
          }
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-semi',
    fontSize: 22,
    width: '80%',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center'
  },
  locationText: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'open-sans-semi',
    color: COLORS.purple,

  },
  directionsButton: {
    backgroundColor: COLORS.purple,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    ...SHADOWS.button,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  directionsImage: {
    width: 30,
    height: 30,
    tintColor: COLORS.white,
  },
  directionsText: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: 'open-sans-semi',
    paddingLeft: 5
  }
})

export default VenueScreen;