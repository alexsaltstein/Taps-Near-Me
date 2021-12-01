import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/COLORS';


const TypeInput = ({ label, curr, setCurr }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <TextInput
        placeholder="Style - Substyle"
        placeholderTextColor={COLORS.lightgray}
        style={{ width: '95%', alignSelf:'center', marginTop: 5, fontFamily: 'open-sans', fontSize: 15, height: 50, borderWidth: 2, borderColor: COLORS.white, borderRadius: 10, padding: 10, color: COLORS.white, }}
        value={curr}
        onChangeText={(val) => setCurr(val)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 20,
    color: COLORS.white,
  }
})

export default TypeInput;