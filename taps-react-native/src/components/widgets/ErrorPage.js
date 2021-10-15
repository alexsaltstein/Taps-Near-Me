import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import BeerAnim from '../../../assets/lotttie-json/bottle-clink.json';
import { COLORS } from '../../styles/COLORS';
import BackButton from '../widgets/BackButton';


const ErrorPage = ({ title = 'Sorry, no results found!', message = "Looks like our servers went to the bar", navigation }) => {
  const animationRef = React.useRef(null);

  React.useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <LottieView
          ref={animationRef}
          style={styles.anim}
          source={BeerAnim}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white
  },
  title: {
    fontFamily: 'open-sans-semi',
    fontSize: 20,
  },
  message: {
    fontFamily: 'open-sans',
    fontSize: 15
  },
  anim: {
    width: 200,
    height: 200
  }
})

export default ErrorPage