import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { COLORS } from '../../styles/COLORS';
import BackButton from '../widgets/BackButton';
import NavIcons from '../widgets/NavIcons';
import filter from '../../../assets/navigation/adjust-alt.png';
import { SHADOWS } from '../../styles/shadows';
import { handleError } from '../utils/ErrorFunctions';
import ErrorToast from '../widgets/ErrorToast';
import Loading from '../widgets/Loading';
import axios from 'axios';

const Indicator = ({ width, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      activeOpacity={1}>
      <View style={{
        width: width,
        height: width,
        borderRadius: width / 2,
        backgroundColor: COLORS.white,
        margin: 5
      }}
      />
    </TouchableOpacity>
  )
}

const ScrollPages = ({ title, navigation }) => {
  return (
    <View style={styles.scrollPage}>
      <TouchableOpacity style={styles.beerResultContainer}
        onPress={() => navigation.navigate('Venue', { id: '1231245' })}
        activeOpacity={1}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const MapScreen = ({ navigation }) => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [mapPoints, setMapPoints] = React.useState([]);
  const scrollRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const [scrolling, setScrolling] = React.useState(false);

  const onScroll = (event) => {
    const totalWidth = Dimensions.get('window').width;
    const offset = event.nativeEvent.contentOffset.x;
    const newPage = Math.floor(offset / totalWidth);
    console.log(scrolling);
    if (scrolling && newPage >= 0 && newPage !== page && newPage < mapPoints.length) {
      goToLocation(mapPoints[newPage].lat, mapPoints[newPage].lng);
      setPage(newPage);
      setScrolling(false);
    }
  }

  const onScrollBeginDrag = (event) => {
    setScrolling(true);
  }

  const goToLocation = async (lat, lng) => {
    mapRef.current?.animateCamera({
      center: {
        latitude: lat,
        longitude: lng
      },
      altitude: 3188556.25721105,
      zoom: 3188556.25721105
    }, 10000)
  }

  const scrollToPosition = (num) => {
    const pos = num * Dimensions.get('window').width;
    scrollRef.current?.scrollTo({ x: pos, y: 0, animated: true });
    goToLocation(mapPoints[num].lat, mapPoints[num].lng);
    setPage(num);
  }

  const getMapData = async () => {
    try {
      const res = await axios.get('http://192.168.1.6:3000/api/beers/markers');
      setMapPoints(res.data.markers);
    } catch {
      handleError('Error: Problem getting map data', setError);
    }
  }

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await getMapData();
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ErrorToast error={error} />
      {loading ?
        <View style={styles.loadAlignment}>
          <BackButton navigation={navigation} />
          <Loading />
        </View> :
        <View>
          <MapView style={styles.map}
            ref={mapRef}
            initialRegion={{
              latitude: mapPoints[0].lat,
              longitude: mapPoints[0].lng,
              latitudeDelta: mapPoints[0].lat,
              longitudeDelta: mapPoints[0].lng,
            }
            }>
            {mapPoints.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.lat, longitude: marker.lng }}
              >
                <TouchableOpacity style={{ backgroundColor: index === page ? COLORS.red : COLORS.white, padding: 10 }}
                  onPress={() => { scrollToPosition(index) }}>
                  <Text>{marker.title}</Text>
                </TouchableOpacity>
              </Marker>
            ))}
          </MapView>
          <View style={styles.header}>
            <BackButton navigation={navigation} relative />
            <Text style={styles.title}>Beer Results</Text>
            <NavIcons source={filter} to='Filter' navigation={navigation} />
          </View>
          <View style={styles.bottom}>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsVerticalScrollIndicator={false}
              onScroll={onScroll}
              onScrollBeginDrag={onScrollBeginDrag}
              scrollEventThrottle={0}>
              {
                mapPoints.map((val, index) => (
                  <ScrollPages
                    key={index}
                    title={val.title}
                    navigation={navigation} />
                ))
              }
            </ScrollView>
          </View>
          <View style={styles.indicatorsContainer}>
            {
              mapPoints.map((_, index) => {
                const width = index === page ? 20 : 10;
                return (
                  <Indicator
                    key={index}
                    width={width}
                    onPress={() => scrollToPosition(index)}
                  />
                )
              })
            }
          </View>
        </View>}
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.white
  },
  loadAlignment: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    width: Dimensions.get('window').width,
    height: 50,
    position: 'absolute',
    top: 0,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    ...SHADOWS.container,
  },
  title: {
    fontFamily: 'open-sans-semi',
    fontSize: 25,
  },
  bottom: {
    position: 'absolute',
    bottom: 40,
    width: Dimensions.get('window').width,
    height: 150,
    flex: 1,
  },
  scrollPage: {
    width: Dimensions.get('window').width,
    alignItems: 'center'
  },
  beerResultContainer: {
    backgroundColor: COLORS.white,
    width: '75%',
    height: 75,
    borderRadius: 20,
    padding: 10
  },
  indicatorsContainer: {
    position: 'absolute',
    bottom: 85,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MapScreen;