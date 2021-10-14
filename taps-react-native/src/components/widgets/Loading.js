import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import BeerAnim from '../../../assets/lotttie-json/loading-beer.json';
import { COLORS } from '../../styles/COLORS';
import BackButton from '../widgets/BackButton';


const Loading = ({ navigation }) => {
  const animationRef = React.useRef(null);

  React.useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <View style={styles.animContainer}>
        <LottieView
          ref={animationRef}
          style={styles.anim}
          source={BeerAnim}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%', 
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  animContainer: {
    justifyContent: 'center', 
    backgroundColor: COLORS.blue, 
    paddingBottom: 20, 
    paddingRight: 10, 
    borderRadius: 15, 
    marginTop: '50%' 
  },
  anim: {
    width: 150, 
    height: 150
  }
})

export default Loading