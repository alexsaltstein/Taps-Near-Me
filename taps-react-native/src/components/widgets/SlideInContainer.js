import React from 'react';
import { Animated, Easing, Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import { SHADOWS } from '../../styles/shadows';

const SlideInContainer = ({ children }) => {
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  const doSlide = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.elastic(0.92),
        useNativeDriver: true,
      }),
    ]).start();
  };

  React.useEffect(() => {
    slideAnim.setValue(Dimensions.get('window').height / 2 + 100);
    doSlide();
  }, [])

  return (
    <Animated.View
      style={[{
        transform: [{ translateY: slideAnim }],
      },
      styles.container]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...SHADOWS.container,
    backgroundColor: COLORS.white,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  }
});

export default SlideInContainer;