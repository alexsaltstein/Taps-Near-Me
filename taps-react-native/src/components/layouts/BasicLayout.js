import React from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import { useRecoilState } from 'recoil';
import { statusBarColor, bottomBarColor } from '../../atoms';

const BasicLayout = ({ children }) => {
  const [statusColor] = useRecoilState(statusBarColor);
  const [bottomColor] = useRecoilState(bottomBarColor);

  return (
    <View style={styles.flex1}>
    <SafeAreaView style={{ ...styles.flex0, backgroundColor: statusColor }} />
    <SafeAreaView style={{ ...styles.flex1, backgroundColor: Platform.OS === 'android' ? statusColor:bottomColor }}>
      <View style={styles.flex1}>
        <StatusBar
          barStyle='dark-content'
          translucent
          backgroundColor={Platform.OS === 'android' ? statusColor:bottomColor}
        />
        {Platform.OS === 'android' && <View style={{paddingTop: 25}}/>}
        {children}
      </View>
    </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flex0:{
    flex: 0,
  }
})

export default BasicLayout;