import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import BeerAnim from '../../../assets/lotttie-json/loading-beer.json';
import { COLORS } from '../../styles/COLORS';

const Loading = () => {
  const animationRef = React.useRef(null);

  React.useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={{ justifyContent: 'center', backgroundColor: COLORS.blue, paddingBottom: 20, paddingRight: 10, borderRadius: 15, marginTop: '50%' }}>
      <LottieView
        ref={animationRef}
        style={{ width: 150, height: 150 }}
        source={BeerAnim}
      />
    </View>
  )
}

export default Loading