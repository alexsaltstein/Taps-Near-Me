import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Logo from '../widgets/Logo';
import filter from '../../../assets/navigation/adjust-alt.png';
import settings from '../../../assets/navigation/settings.png';
import NavIcons from '../widgets/NavIcons';
import setStatusBarColor from '../utils/StatusBarColorFunctions';
import { handleError } from '../utils/ErrorFunctions';
import ErrorToast from '../widgets/ErrorToast';
import { COLORS } from '../../styles/COLORS';
import useUserLocation from '../utils/useUserLocationFunctions';
import LoadingPartial from '../widgets/LoadingPartial';

const HomeScreen = ({ navigation }) => {
  const [setColor] = setStatusBarColor();
  const [error, setError] = React.useState(null);
  const [location, setLocation] = useUserLocation();

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
            [{ icon: filter, to: 'Filter' },
            { icon: settings, to: 'Settings' }].map(i => (
              <NavIcons
                key={i.to}
                source={i.icon}
                to={i.to}
                navigation={navigation} />
            ))
          }
        </View>
      </View>
      <Text>What are we looking to drink?</Text>
      <TouchableOpacity onPress={() => { navigation.navigate('Map') }}>
        <Text>Map</Text>
      </TouchableOpacity>
      <View>
        {!location ?
          <LoadingPartial /> :
          <Text>{`lat: ${location.lat}, lng: ${location.lng}`}</Text>
        }
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
export default HomeScreen;