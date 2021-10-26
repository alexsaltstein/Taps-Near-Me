import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Logo from '../widgets/Logo';
import filter from '../../../assets/navigation/adjust-alt.png';
import settings from '../../../assets/navigation/settings.png';
import NavIcons from '../widgets/NavIcons';
import setStatusBarColor from '../utils/StatusBarColorFunctions';
import { COLORS } from '../../styles/COLORS';

const HomeScreen = ({ navigation }) => {
  const [setColor] = setStatusBarColor();

  React.useEffect(() => {
    navigation.addListener(
      'focus',
      () => {
        setColor(COLORS.white);
      },
    );
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <View style={styles.buttonsContainer}>
          {
            [{ icon: filter, to: 'Filter' },
            { icon: settings, to: 'Settings'}].map(i => (
              <NavIcons
                key={i.to}
                source={i.icon}
                to={i.to}
                navigation={navigation}/>
            ))
          }
        </View>
      </View>
      <Text>What are we looking to drink?</Text>
      <TouchableOpacity testID='Map.Button' onPress={()=>{navigation.navigate('Map')}}>
        <Text>Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
export default HomeScreen;