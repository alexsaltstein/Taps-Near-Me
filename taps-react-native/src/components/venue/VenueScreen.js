import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../widgets/BackButton';
import ErrorPage from '../widgets/ErrorPage';
import Loading from '../widgets/Loading';

const VenueScreen = ({ navigation, route }) => {
  const { id } = route.params;

  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const getData = async () => {
    try{

    }catch {
      setError(true);
    }
  }

  React.useEffect(()=> {
    (async () => {
      setLoading(true);
      await getData();
      setLoading(false);
    })()
    setLoading(false)
  })
  return (
    <View style={{flex: 1}}>
      { loading ?
        <Loading /> :
        <View style={{flex: 1}}>
          {
            error ?
              <ErrorPage navigation={navigation} />
              :
              <View style={styles.container}>
                <BackButton navigation={navigation} />
                <Text>Venue Screen</Text>
                <Text>id: {id}</Text>
              </View>
          }
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default VenueScreen;