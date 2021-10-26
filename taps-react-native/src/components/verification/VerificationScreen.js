import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../../styles/COLORS';
import { SHADOWS } from '../../styles/shadows';
import ClickableText from '../widgets/ClickableText';
import Logo from '../widgets/Logo';
import SlideInContainer from '../widgets/SlideInContainer';
import Spacing from '../widgets/Spacing';
import ErrorToast from '../widgets/ErrorToast';
import { handleError } from '../utils/ErrorFunctions';
import useDateOfBirth from './useDateOfBirth';
import setStatusBarColor from '../utils/StatusBarColorFunctions';


const VerificationScreen = ({ navigation }) => {
  const [error, setError] = React.useState(null);
  const [dateOfBirth, setDateOfBirth] = useDateOfBirth();
  const [text, setText] = React.useState(dateOfBirth);
  const [inputFocused, setInputFocused] = React.useState(false);
  const [setColor] = setStatusBarColor();

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
    if (text.length === DATE_LENGTH) {
      const MM = text.substring(0, 2);
      const DD = text.substring(2, 4);
      const YYYY = text.substring(4);
      const years = moment(new Date())
        .diff(`${YYYY}-${MM}-${DD}`,
          'years', false);
      if (years >= 21) {
        setDateOfBirth(text);
        navigation.navigate('Home');
      } else {
        handleError('Error: You must be 21 to use this app', setError);
      }
    } else {
      handleError('Error: Please input a valid date', setError);
    }
  };

  React.useEffect(() => {
    if (dateOfBirth !== '') {
      setText(dateOfBirth);
    }
  }, [dateOfBirth]);
  
  React.useEffect(() => {
    setColor(COLORS.red);
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.alignment}>
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
          <ErrorToast
            error={error} />
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
      <Text style={styles.disclaimerText}>
        You must be at least 21 years of age to drink alcoholic beverages. Do not drink and drive, drink to excess or drink with certain medications or medical conditions. For more information, please visit <ClickableText text="this website" url="http://www.cdc.gov/alcohol/index.htm"/> or contact your health provider.
        </Text>
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
  noteContainer: {
    position: 'absolute',
    bottom: 0,
  },
  alignment: {
    flex: 0.65
  },
  hidden: {
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
    paddingTop: 8
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
    textAlign: 'center'
  },
  disclaimerText: {
    fontFamily: 'open-sans',
    fontSize: 12,
    position: 'absolute',
    bottom: 0, 
    textAlign: 'center',
    justifyContent: 'center',
    padding: 5,
  }
})

export default VerificationScreen;