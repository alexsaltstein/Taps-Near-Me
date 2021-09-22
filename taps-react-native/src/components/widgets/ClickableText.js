import React from 'react';
import {Linking, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

const ClickableText = ({text, url}) => {
  return (
    <TouchableWithoutFeedback
      onPress={()=>Linking.openURL(url)}>
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    textDecorationLine: 'underline',
  }
})

export default ClickableText;