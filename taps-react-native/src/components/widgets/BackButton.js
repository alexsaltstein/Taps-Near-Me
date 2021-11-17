import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import backImage from '../../../assets/navigation/leftArrow.png';
import { COLORS } from '../../styles/COLORS';


const BackButton = ({ color = COLORS.black, navigation, relative = false }) => {
  return (
    <TouchableOpacity 
    style={relative ? {position: 'relative'}: styles.container}
    onPress={()=>navigation.goBack()}
    testID={'BackButton.Navigate'}>
      <Image style={[{ tintColor: color }, styles.backImage]} source={backImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    left: 10,
    top: 5,
  },
  backImage: {
    width: 30,
    height: 30
  }
});

export default BackButton;