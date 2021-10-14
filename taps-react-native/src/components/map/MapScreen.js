import React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { COLORS } from '../../styles/COLORS';
import BackButton from '../widgets/BackButton';
import NavIcons from '../widgets/NavIcons';
import filter from '../../../assets/navigation/adjust-alt.png';
import { SHADOWS } from '../../styles/shadows';
import { handleError } from '../utils/ErrorFunctions';
import ErrorToast from '../widgets/ErrorToast';
import Loading from '../widgets/Loading';
import Indicator from './Indicator';
import ScrollPages from './ScrollPages';
import MapMarker from './MapMarker';
import { SERVER_URL } from '../../../config';

const MapScreen = ({ navigation }) => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [mapPoints, setMapPoints] = React.useState([]);
  const scrollRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const [scrolling, setScrolling] = React.useState(false);
  const [currOff, setCurrOff] = React.useState(0);
  const onScroll = (event) => {
    const totalWidth = Math.floor(Dimensions.get('window').width);
    const offset = Math.floor(event.nativeEvent.contentOffset.x);
    const newPage = Math.floor(offset / totalWidth);
    if (scrolling && newPage >= 0 && page !== newPage && newPage < mapPoints.length) {
      goToLocation(mapPoints[newPage].lat, mapPoints[newPage].lng);
      setPage(newPage);
      setScrolling(false);
    }
    setCurrOff(offset);
  }

  React.useEffect(() => {
    if (!scrolling) {
      const totalWidth = Math.floor(Dimensions.get('window').width);
      const currPage = Math.floor(currOff / totalWidth);
      if (currPage !== page){
        setPage(currPage);
        goToLocation(mapPoints[currPage].lat, mapPoints[currPage].lng);
      }
    }
  }, [currOff])

  const onScrollBeginDrag = (event) => {
    setScrolling(true);
  }

  const goToLocation = async (lat, lng) => {
    mapRef.current?.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 1,
      longitudeDelta: 1,
    })
  }

  const scrollToPosition = (num) => {
    const pos = num * Dimensions.get('window').width;
    scrollRef.current?.scrollTo({ x: pos, y: 0, animated: true });
    goToLocation(mapPoints[num].lat, mapPoints[num].lng);
    setPage(num);
  }

  const getMapData = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/beers/markers`);
      setMapPoints(res.data.markers);
    } catch (e) {
      console.log(e.message);
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
        <Loading navigation={navigation} /> :
        <View>
          <MapView style={styles.map}
            ref={mapRef}
            initialRegion={mapPoints.length !== 0 ? {
              latitude: mapPoints[0].lat,
              longitude: mapPoints[0].lng,
              latitudeDelta: mapPoints[0].lat,
              longitudeDelta: mapPoints[0].lng,
            } :
              {
                latitude: 40.7440,
                longitude: 74.0325,
                latitudeDelta: 40.7440,
                longitudeDelta: 74.0325,
              }
            }>
            {mapPoints.map((marker, index) => (
              <MapMarker
                key={'mapMarker-' + index}
                marker={marker}
                index={index}
                page={page}
                scrollToPosition={scrollToPosition}
              />
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
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              onScrollBeginDrag={onScrollBeginDrag}
              scrollEventThrottle={0}>
              {
                mapPoints.map((val, index) => (
                  <ScrollPages
                    key={'scrollPages-' + index}
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
                    key={'indicator-' + index}
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