import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import { SHADOWS } from '../../styles/shadows';
import ClickableText from '../widgets/ClickableText';
import Logo from '../widgets/Logo';
import SlideInContainer from '../widgets/SlideInContainer';
import Spacing from '../widgets/Spacing';

const VerificationScreen = ({ navigation }) => {
  const [text, setText] = React.useState('');
  const [inputFocused, setInputFocused] = React.useState(false);
  const DATE_LENGTH = 8;
  const ref = React.useRef(null);

  const handleOnPress = () => {
    setInputFocused(true);
    ref.current.focus();
  };

  const handleOnBlur = () => {
    setInputFocused(false);
  };

  const onSubmit = () => {
    // add validation
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        value={text}
        onChangeText={setText}
        onBlur={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={DATE_LENGTH}
        style={styles.hidden} />
      <SlideInContainer>
        <Logo />
        <Text style={styles.title}>Can I see some ID?</Text>
        <Text style={styles.subtitle}>You must be of legal drinking age to use this app.</Text>
        <TouchableOpacity
          style={styles.dateInputContainer}
          onPress={() => handleOnPress()}
          activeOpacity={1}>
          <Text style={styles.dateText}>
            {'MMDDYYYY'.split('').map((val, i) => {
              let ret = '';
              if (i < text.length) {
                ret = text.charAt(i);
              } else {
                ret = val;
              }
              if (i === 1 || i === 3) {
                ret += '/';
              }
              return ret;
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>
            Enter Now
            </Text>
        </TouchableOpacity>
        <Spacing vertical={10} />
        <Text style={styles.legalText}>By entering this app you are agreeing to our <ClickableText text="Terms of Service" url="https://www.google.com" /> and <ClickableText text="Privacy Policy" url="https://www.google.com" /> </Text>
      </SlideInContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.red,
  },
  hidden: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
  title: {
    fontFamily: 'open-sans-semi',
    fontSize: 18,
  },
  subtitle: {
    fontFamily: 'open-sans',
    textAlign: 'center',
    paddingHorizontal: 8,
    fontSize: 15,
  },
  dateInputContainer: {
    padding: 20
  },
  dateText: {
    fontSize: 30,
    fontFamily: 'open-sans',
  },
  buttonContainer: {
    backgroundColor: COLORS.green,
    paddingVertical: 5,
    paddingHorizontal: 35,
    borderRadius: 5,
    ...SHADOWS.button,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: 'open-sans-semi',
  },
  legalText: {
    fontFamily: 'open-sans',
    paddingBottom: 20,
    paddingHorizontal: 8,
    fontSize: 12,
    textAlign: 'center',
  }
})

export default VerificationScreen;