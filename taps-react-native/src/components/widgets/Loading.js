import React from 'react';
import { View } from 'react-native';
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
    <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
      <BackButton navigation={navigation} />
      <View style={{ justifyContent: 'center', backgroundColor: COLORS.blue, paddingBottom: 20, paddingRight: 10, borderRadius: 15, marginTop: '50%' }}>
        <LottieView
          ref={animationRef}
          style={{ width: 150, height: 150 }}
          source={BeerAnim}
        />
      </View>
    </View>
  )
}

export default Loading